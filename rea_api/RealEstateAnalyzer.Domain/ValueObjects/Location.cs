using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class Location(string city, string district, string street, string postalCode, 
    decimal? latitude, decimal? longitude) : ValueObject
{
    public string City { get; } = city;
    public string District { get; } = district;
    public string Street { get; } = street;
    public string PostalCode { get; } = postalCode;
    public decimal? Latitude { get; } = latitude;
    public decimal? Longitude { get; } = longitude;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return City;
        yield return District;
        yield return Street;
        yield return PostalCode;
        yield return Latitude;
        yield return Longitude;
    }
}