using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class Location(string city, string district, string voivodeship) : ValueObject
{
    public string City { get; } = city;
    public string District { get; } = district;
    public string Voivodeship { get; } = voivodeship;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return City;
        yield return District;
        yield return Voivodeship;
    }

    public static Location FromStrings(string city, string district, string voivodeship) =>
        new(city, district, voivodeship);
}