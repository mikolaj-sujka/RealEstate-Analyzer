using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class Location(string city, string district) : ValueObject
{
    public string City { get; } = city;
    public string District { get; } = district;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return City;
        yield return District;
    }
}