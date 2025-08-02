using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class Location(string city, string district) : ValueObject
{
    public string City { get; } = city ?? throw new ArgumentNullException(nameof(city));
    public string District { get; } = district ?? throw new ArgumentNullException(nameof(district));

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return City;
        yield return District;
    }
}