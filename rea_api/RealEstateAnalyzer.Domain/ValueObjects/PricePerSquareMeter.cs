using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class PricePerSquareMeter : ValueObject
{
    public decimal Price { get; }

    public PricePerSquareMeter()
    {
        if (Price < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(Price), "Price per square meter cannot be negative.");
        }

        Price = Price;
    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Price;
    }
}