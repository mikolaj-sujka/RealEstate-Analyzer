using CsvHelper.Configuration;

namespace RealEstateAnalyzer.Application.Mappers.GusHousingCsvMap;

public record GusHousingCsvRow(
    string CityCode,
    string CityName,
    uint Year,
    uint Quarter,
    decimal Value);
public sealed class GusHousingCsvMap : ClassMap<GusHousingCsvRow>
{
    public GusHousingCsvMap()
    {
        Map(m => m.CityCode).Name("Kod");
        Map(m => m.CityName).Name("Nazwa");
        Map(m => m.Year).Name("rok");
        Map(m => m.Quarter).Name("kwartal");
        Map(m => m.Value).Name("wartosc");
    }
}