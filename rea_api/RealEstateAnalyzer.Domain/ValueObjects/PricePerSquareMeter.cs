using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class PricePerSquareMeter : ValueObject
{
    public decimal Price { get; }

    public PricePerSquareMeter(decimal price)
    {
        if (price < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(price), "Price per square meter cannot be negative.");
        }

        Price = price;
    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Price;
    }
}