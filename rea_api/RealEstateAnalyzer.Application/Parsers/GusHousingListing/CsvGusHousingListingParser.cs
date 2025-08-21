using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Domain.ValueObjects;
using System.Globalization;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;
public class CsvGusHousingListingParser : IFileParser<Domain.Entities.GusHousingListing>
{
    private readonly ILogger<CsvGusHousingListingParser> _logger;
    private readonly string _directory;
    private readonly Dictionary<string, Action<GusHousingPartial, decimal>> _metricSetters 
        = new Dictionary<string, Action<GusHousingPartial, decimal>>(StringComparer.OrdinalIgnoreCase)
    {
        ["mediana_sprzedanych_m2.csv"] = (p, v) => p.MedianPricePerSqm = PricePerSquareMeter.FromDecimal(v),
        ["srednia_sprzedanych_m2.csv"] = (p, v) => p.AveragePricePerSqm = PricePerSquareMeter.FromDecimal(v),
        ["mieszkania_oddane_do_uzytkowania.csv"] = (p, v) => p.FlatsCompleted = Volume.FromDecimal(v),
        ["wartosc_lokali_sprzedanych.csv"] = (p, v) => p.TotalValueSold = Money.FromDecimal(v),
        ["liczba_lokali_sprzedanych.csv"] = (p, v) => p.FlatsSold = Volume.FromDecimal(v),
        ["srednia_cena_sprzedanych.csv"] = (p, v) => p.AverageTotalPrice = Money.FromDecimal(v)
    };

    private readonly Dictionary<string, (uint From, uint To)> _specialQuarterMap 
        = new Dictionary<string, (uint From, uint To)>(StringComparer.OrdinalIgnoreCase)
    {
        ["pierwsze półrocze"] = (1, 2),
        ["drugie półrocze"] = (3, 4),
        ["1-3 kwartal"] = (1, 3),
        ["2-4 kwartal"] = (2, 4)
    };

    public CsvGusHousingListingParser(
        ILogger<CsvGusHousingListingParser> logger,
        IHostEnvironment env,
        IConfiguration config)
    {
        _logger = logger;
        var folder = config.GetValue<string>("CsvSettings:GusHousingDirectory") ?? "RealEstateAnalyzer-Csv-Files";
        _directory = Path.GetFullPath(Path.Combine(env.ContentRootPath, "..", folder));
    }

    public async Task<ParseResult<Domain.Entities.GusHousingListing>> ParseAsync(CancellationToken ct)
    {
        if (!Directory.Exists(_directory))
        {
            _logger.LogWarning("Missing directory: {directory}", _directory);
            return ParseFailure(errors: new[]
            {
                $"Missing directory: {_directory}"
            });
        }

        // Build full paths
        var paths = _metricSetters.Keys
            .Select(name => (Name: name, Path: Path.Combine(_directory, name)))
            .ToList();

        // Check missing files
        var missing = paths.Where(x => !File.Exists(x.Path)).Select(x => x.Name).ToArray();
        if (missing.Length > 0)
        {
            var missingFiles = string.Join(", ", missing);

            return ParseFailure(errors: new[]
            {
                $"Missing files in directory '{_directory}': {missingFiles}"
            });
        }

        var partials = new Dictionary<CsvParsingGusHousingKey, GusHousingPartial>();
        foreach (var (name, path) in paths)
            await ProcessFileAsync(name, path, partials);

        var listings = partials.Values
            .Select(p => Domain.Entities.GusHousingListing.Create(
                p.CityCode, p.CityName, p.Period,
                p.MedianPricePerSqm ?? PricePerSquareMeter.Zero(), p.AveragePricePerSqm ?? PricePerSquareMeter.Zero(),
                p.FlatsCompleted ?? Volume.Zero(), p.FlatsSold ?? Volume.Zero(),
                p.TotalValueSold ?? Money.Zero(), p.AverageTotalPrice ?? Money.Zero()))
            .ToArray();

        return new ParseResult<Domain.Entities.GusHousingListing>(listings, Array.Empty<string>(), true);
    }

    private async Task ProcessFileAsync(
        string fileName,
        string fullPath,
        Dictionary<CsvParsingGusHousingKey, GusHousingPartial> partials)
    {
        _logger.LogInformation("Parsing file: {File}", fileName);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = ";",
            BadDataFound = null,
            MissingFieldFound = null,
            HeaderValidated = null,
            PrepareHeaderForMatch = args => args.Header.Trim()
        };

        await using var stream = File.OpenRead(fullPath);
        using var reader = new StreamReader(stream);
        using var csv = new CsvReader(reader, config);

        await csv.ReadAsync();
        csv.ReadHeader();
        var headers = csv.HeaderRecord!;
        var dataCols = headers.Select((h, i) => (Header: h, Index: i)).Where(x => x.Index >= 2).ToArray();

        while (await csv.ReadAsync())
        {
            if (!CsvParsingGusHousingListingHelpers.TryReadKey(csv, out var key))
                continue;

            foreach (var (Header, Index) in dataCols)
            {
                var raw = csv.GetField(Index);
                if (!CsvParsingGusHousingListingHelpers.TryParseDecimal(raw!, out var value))
                    continue;

                // special cases: ranges or half-years
                if (CsvParsingGusHousingListingHelpers.TryGetSpecialQuarterRange(Header, _specialQuarterMap, out var range))
                {
                    if (!CsvParsingGusHousingListingHelpers.TryExtractYear(Header, out var year))
                        continue;
                    for (uint q = range.From; q <= range.To; q++)
                        ApplyMetric(fileName, key.WithPeriod(year, q), value, partials);
                }
                // standard quarter extraction
                else if (CsvParsingGusHousingListingHelpers.TryExtractQuarter(Header, out var quarter)
                         && CsvParsingGusHousingListingHelpers.TryExtractYear(Header, out var yearStd))
                {
                    ApplyMetric(fileName, key.WithPeriod(yearStd, quarter), value, partials);
                }
            }
        }
    }

    private void ApplyMetric(
        string fileName,
        CsvParsingGusHousingKey key,
        decimal value,
        Dictionary<CsvParsingGusHousingKey, GusHousingPartial> partials)
    {
        if (!partials.TryGetValue(key, out var part))
        {
            part = new GusHousingPartial(key.CityCode, key.CityName, key.GetPeriod());
            partials[key] = part;
        }
        _metricSetters[fileName](part, value);
    }

    private static ParseResult<Domain.Entities.GusHousingListing> ParseFailure(IReadOnlyList<string> errors) =>
        new(
            Success: false,
            Errors: errors,
            Records: Array.Empty<Domain.Entities.GusHousingListing>()
        );
}