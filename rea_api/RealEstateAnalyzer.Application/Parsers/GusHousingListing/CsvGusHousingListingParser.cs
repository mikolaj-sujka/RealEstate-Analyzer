using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.Mappers.GusHousingCsvMap;
using RealEstateAnalyzer.Domain.ValueObjects;
using System.Globalization;
using System.Text.RegularExpressions;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;
public class CsvGusHousingListingParser(ILogger<CsvGusHousingListingParser> logger, IHostEnvironment env)
    : IFileParser<Domain.Entities.GusHousingListing>
{
    private readonly string _directory = Path.GetFullPath(
        Path.Combine(env.ContentRootPath,"..", "RealEstateAnalyzer-Csv-Files"));

    private readonly Dictionary<string, Action<GusHousingPartial, GusHousingCsvRow>> _metricSetters
        = new(StringComparer.OrdinalIgnoreCase)
        {
            ["mediana_sprzedanych_m2.csv"] = (p, r) => p.MedianPricePerSqm = PricePerSquareMeter.FromDecimal(r.Value),
            ["srednia_sprzedanych_m2.csv"] = (p, r) => p.AveragePricePerSqm = PricePerSquareMeter.FromDecimal(r.Value),
            ["mieszkania_oddane_do_uzytkowania.csv"] = (p, r) => p.FlatsCompleted = Volume.FromDecimal(r.Value),
            ["wartosc_lokali_sprzedanych.csv"] = (p, r) => p.TotalValueSold = Money.FromDecimal(r.Value),
            ["liczba_lokali_sprzedanych.csv"] = (p, r) => p.FlatsSold = Volume.FromDecimal(r.Value),
            ["srednia_cena_sprzedanych.csv"] = (p, r) => p.AverageTotalPrice = Money.FromDecimal(r.Value),
        };

    private static readonly Dictionary<string, (uint From, uint To)> SpecialQuarterMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["pierwsze półrocze"] = (1, 2),
        ["drugie półrocze"] = (3, 4),
        ["1-3 kwartal"] = (1, 3),
        ["2-4 kwartal"] = (2, 4),
    };

    public async Task<ParseResult<Domain.Entities.GusHousingListing>> ParseAsync(CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        if (!await DirectoryExists(_directory)) return await Task.FromResult(ParseFailure());

        var files = _metricSetters.Keys
            .Select(fn => (Name: fn, Path: Path.Combine(_directory, fn)))
            .ToList();

        var missing = files.Where(x => !File.Exists(x.Path)).ToList();
        if (missing.Any())
        {
            foreach (var m in missing)
            {
                var msg = $"Brak pliku: {m.Name}";
                logger.LogWarning(msg);
                errors.Add(msg);
            }
            return ParseFailure(errors.ToArray());
        }

        var partials = await GetPartialsAsync(files);

        var listings = partials.Values
            .Select(p => Domain.Entities.GusHousingListing.Create(
                cityCode: p.CityCode,
                cityName: p.CityName,
                period: p.Period,
                medianPricePerSqm: p.MedianPricePerSqm ?? PricePerSquareMeter.Zero(),
                averagePricePerSqm: p.AveragePricePerSqm ?? PricePerSquareMeter.Zero(),
                flatsCompleted: p.FlatsCompleted ?? Volume.Zero(),
                flatsSold: p.FlatsSold ?? Volume.Zero(),
                totalValueSold: p.TotalValueSold ?? Money.Zero(),
                averageTotalPrice: p.AverageTotalPrice ?? Money.Zero()))
            .ToList();

        logger.LogInformation("Parsowanie zakończone. Utworzono {Count} rekordów.", listings.Count);
        return new ParseResult<Domain.Entities.GusHousingListing>(listings, errors.ToArray(), errors.Count == 0);
    }

    private async Task<Dictionary<(string CityCode, string CityName, uint Year, uint Quarter), GusHousingPartial>> 
        GetPartialsAsync(List<(string FileName, string FullPath)> files)
    {
        var errors = new List<string>();
        var partials = new Dictionary<(string CityCode, string CityName, uint Year, uint Quarter), 
            GusHousingPartial>();
        var cfg = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            Delimiter = ";",
            BadDataFound = null,
            MissingFieldFound = null,
            HeaderValidated = null,
            PrepareHeaderForMatch = h => h.Header.Trim()
        };

        foreach (var (fileName, fullPath) in files)
        {
            logger.LogInformation("Parsowanie pliku: {FileName}", fileName);
            using var reader = new StreamReader(fullPath);
            using var csv = new CsvReader(reader, cfg);

            await csv.ReadAsync();
            csv.ReadHeader();
            var headers = csv.HeaderRecord!;

            var dataCols = headers
                .Select((h, idx) => (Header: h, Index: idx))
                .Where(x => x.Index >= 2)
                .ToArray();

            while (await csv.ReadAsync())
            {
                string cityName;
                string cityCode;

                try
                {
                    cityCode = csv.GetField("Kod")!;
                    cityName = csv.GetField("Nazwa")!;
                }
                catch (Exception ex)
                {
                    var msg = $"Błędne Kod/Nazwa w wierszu {csv.Context.Parser!.Row}: {ex.Message}";
                    logger.LogWarning(msg);
                    errors.Add(msg);
                    continue;
                }

                foreach (var (Header, Index) in dataCols)
                {
                    string rawValue = csv.GetField(Index)!;
                    if (!decimal.TryParse(rawValue, NumberStyles.Any, CultureInfo.InvariantCulture, out var value))
                        continue;

                    var specialKey = SpecialQuarterMap.Keys
                        .FirstOrDefault(k => Header.Contains(k, StringComparison.OrdinalIgnoreCase));
                    if (specialKey is not null)
                    {
                        var (fromQ, toQ) = SpecialQuarterMap[specialKey];
                        var yMatch = Regex.Match(Header, @"\b(20\d{2}|19\d{2})\b");
                        if (!yMatch.Success || !uint.TryParse(yMatch.Groups[1].Value, out var year))
                        {
                            logger.LogWarning("Nieparsowalny rok w nagłówku: {Header}", Header);
                            continue;
                        }
                        for (uint q = fromQ; q <= toQ; q++)
                        {
                            var key = (cityCode, cityName, year, q);
                            if (!partials.TryGetValue(key, out var part))
                            {
                                part = new GusHousingPartial(cityCode, cityName, new QuarterPeriod(year, q));
                                partials[key] = part;
                            }
                            _metricSetters[fileName](part, new GusHousingCsvRow(cityCode, cityName, year, q, value));
                        }
                        continue;
                    }

                    var qMatch = Regex.Match(Header, @"(\d+)\s*kwart", RegexOptions.IgnoreCase);
                    if (!qMatch.Success || !uint.TryParse(qMatch.Groups[1].Value, out var quarter))
                    {
                        logger.LogWarning("Nieparsowalny kwartał w nagłówku: {Header}", Header);
                        continue;
                    }

                    var yMatchStd = Regex.Match(Header, @"\b(20\d{2}|19\d{2})\b");
                    if (!yMatchStd.Success || !uint.TryParse(yMatchStd.Groups[1].Value, out var yearStd))
                    {
                        logger.LogWarning("Nieparsowalny rok w nagłówku: {Header}", Header);
                        continue;
                    }
                    var stdkey = (cityCode, cityName, yearStd, quarter);
                    if (!partials.TryGetValue(stdkey, out var stdPart))
                    {
                        stdPart = new GusHousingPartial(cityCode, cityName, new QuarterPeriod(yearStd, quarter));
                        partials[stdkey] = stdPart;
                    }

                    _metricSetters[fileName](stdPart, new GusHousingCsvRow(cityCode, cityName, yearStd, quarter, value));
                }
            }
        }

        return partials;
    }

    private Task<bool> DirectoryExists(string directory)
    {
        if (Directory.Exists(directory))
        {
            return Task.FromResult(true);
        }
        logger.LogError("Directory does not exist: {Directory}", directory);
        return Task.FromResult(false);
    }

    private static ParseResult<Domain.Entities.GusHousingListing> ParseFailure(params string[] errs)
        => new(
            Array.Empty<Domain.Entities.GusHousingListing>(), errs, Success: false);
}

public class GusHousingPartial(string cityCode, string cityName, QuarterPeriod period)
{
    public string CityCode { get; } = cityCode;
    public string CityName { get; } = cityName;
    public QuarterPeriod Period { get; } = period;

    public PricePerSquareMeter? MedianPricePerSqm { get; set; }
    public PricePerSquareMeter? AveragePricePerSqm { get; set; }
    public Volume? FlatsCompleted { get; set; }
    public Money? TotalValueSold { get; set; }
    public Money? AverageTotalPrice { get; set; }
    public Volume? FlatsSold { get; set; }
}