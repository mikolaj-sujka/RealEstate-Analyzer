using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;
public sealed class Volume(uint count) : ValueObject
{
    public uint Count { get; } = count;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Count;
    }

    public static Volume Zero() => new Volume(0);
    public static Volume FromDecimal(decimal d)
    {
        if (d < 0)
            throw new ArgumentOutOfRangeException(nameof(d), "Volume cannot be negative.");
        
        return new Volume((uint)d);
    }
}
