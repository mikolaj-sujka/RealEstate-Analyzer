using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;
public sealed class Volume : ValueObject
{
    public int Count { get; }

    public Volume(int count)
    {
        if (count < 0) throw new ArgumentException("Volume must be non-negative");
        Count = count;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Count;
    }
}
