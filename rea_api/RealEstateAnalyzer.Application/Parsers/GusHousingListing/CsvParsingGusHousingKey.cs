using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;

internal readonly struct CsvParsingGusHousingKey(string code, string name, uint year, uint quarter)
    : IEquatable<CsvParsingGusHousingKey>
{
    public string CityCode { get; } = code;
    public string CityName { get; } = name;
    public uint Year { get; } = year;
    public uint Quarter { get; } = quarter;

    public CsvParsingGusHousingKey WithPeriod(uint year, uint quarter)
        => new(CityCode, CityName, year, quarter);

    public bool Equals(CsvParsingGusHousingKey other)
        => CityCode == other.CityCode
           && CityName == other.CityName
           && Year == other.Year
           && Quarter == other.Quarter;

    public override int GetHashCode()
        => HashCode.Combine(CityCode, CityName, Year, Quarter);

    public QuarterPeriod GetPeriod()
        => new QuarterPeriod(Year, Quarter);
}

