namespace RealEstateAnalyzer.Application.Abstractions
{
    public interface IDateTimeProvider
    {
        DateTime UtcNow { get; }
        DateTime TodayUtc { get; }
        int CurrentYearUtc { get; }
    }
}
