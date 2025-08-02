using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;
public sealed class Volume(uint count) : ValueObject
{
    public uint Count { get; } = count;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Count;
    }
}
