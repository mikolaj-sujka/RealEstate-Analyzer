using CsvHelper.Configuration;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;

public record GusHousingCsvRow(
    Guid CityId,
    string CityName,
    uint Year,
    uint Quarter,
    double MedianPricePerSqm,
    double AveragePricePerSqm,
    double FlatsCompleted,
    double ConstructionStarts,
    double AverageFlatSize,
    double TotalValueSold);
public class CsvGusHousingListingParser(string directory, ILogger<CsvGusHousingListingParser> logger)
    : IFileParser<Domain.Entities.GusHousingListing>
{
    private readonly string _directory = directory;
    private readonly ILogger<CsvGusHousingListingParser> _logger = logger;
    private readonly Dictionary<string, Action<GusHousingPartial, GusHousingCsvRow>> _metricSetters
        = new()
        {
            ["mediana_sprzedanych_m2.csv"] = (p, r) => p.MedianPricePerSqm = PricePerSquareMeter.FromDecimal(r.Value),
            ["srednia_sprzedanych_m2.csv"] = (p, r) => p.AveragePricePerSqm = PricePerSquareMeter.FromDecimal(r.Value),
            ["mieszkania_oddane_do_uzytkowania.csv"] = (p, r) => p.FlatsCompleted = Volume.FromDecimal(r.Value),
            ["mieszkania_budowe_rozpoczeto.csv"] = (p, r) => p.ConstructionStarts = Volume.FromDecimal(r.Value),
            //["average_flat_size.csv"] = (p, r) => p.AverageFlatSize = Area.FromDecimal(r.Value),
            ["wartosc_lokali_sprzedanych.csv"] = (p, r) => p.TotalValueSold = Money.FromDecimal(r.Value),
        };

    public Task<ParseResult<Domain.Entities.GusHousingListing>> ParseAsync(Stream fileStream, 
        CancellationToken cancellationToken)
    {
        var errors = new List<string>();

        var missingFiles = _metricSetters.Keys
            .Select(fn => Path.Combine(_directory, fn))
            .Where(fullPath => !File.Exists(fullPath))
            .Select(fullPath => Path.GetFileName(fullPath)!)
            .ToList();

        if (!missingFiles.Any())
            return Task.FromResult(new ParseResult<Domain.Entities.GusHousingListing>( 
                Records: Array.Empty<Domain.Entities.GusHousingListing>(),
                Errors: Array.Empty<string>(), Success: true));

        errors.AddRange(missingFiles.Select(f => $"Brak pliku: {f}"));


        return Task.FromResult(new ParseResult<Domain.Entities.GusHousingListing>(
            Records: Array.Empty<Domain.Entities.GusHousingListing>(),
            Errors: errors, Success: false));
    }

    public class GusHousingPartial(Guid cityId, string cityName, QuarterPeriod period)
    {
        public Guid CityId { get; } = cityId;
        public string CityName { get; } = cityName;
        public QuarterPeriod Period { get; } = period;

        public PricePerSquareMeter? MedianPricePerSqm { get; set; }
        public PricePerSquareMeter? AveragePricePerSqm { get; set; }
        public Volume? FlatsCompleted { get; set; }
        public Volume? ConstructionStarts { get; set; }
        public Area? AverageFlatSize { get; set; }
        public Money? TotalValueSold { get; set; }
    }

    public class GusHousingCsvRow
    {
        public string Kod { get; set; } = "";
        public string Nazwa { get; set; } = "";
        public string Quarter { get; set; } = "";
        public decimal Value { get; set; }
    }
    public sealed class GusHousingCsvRowMap : ClassMap<GusHousingCsvRow>
    {
        public GusHousingCsvRowMap()
        {
            Map(m => m.Kod).Name("Kod");
            Map(m => m.Nazwa).Name("Nazwa");
            Map(m => m.Quarter).Name("Okres");
            Map(m => m.Value).Name("Value");
        }
    }
}