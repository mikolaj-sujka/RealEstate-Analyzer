using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class QuarterPeriod : ValueObject
{
    public uint Year { get; private set; }
    public uint Quarter { get; private set; }

    public QuarterPeriod(uint year, uint quarter)
    {
        if (year is < 2000 or > 2100)
            throw new ArgumentOutOfRangeException(nameof(year), "Year must be between 2000 and 2100.");

        if (quarter is < 1 or > 4)
            throw new ArgumentOutOfRangeException(nameof(quarter), "Quarter must be between 1 and 4.");

        Year = year;
        Quarter = quarter;
    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Year;
        yield return Quarter;
    }
}