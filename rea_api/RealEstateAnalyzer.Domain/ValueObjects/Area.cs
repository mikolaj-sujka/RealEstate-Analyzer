using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;
public sealed class Area : ValueObject
{
    public decimal SquareMeters { get; }

    public Area(decimal sqm)
    {
        if (sqm < 0) throw new ArgumentException("Area must be non-negative");
        SquareMeters = sqm;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return SquareMeters;
    }

    public static Area Zero() => new Area(0);
}
