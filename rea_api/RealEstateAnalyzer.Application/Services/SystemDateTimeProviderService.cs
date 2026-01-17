using RealEstateAnalyzer.Application.Abstractions;

namespace RealEstateAnalyzer.Application.Services
{
    public sealed class SystemDateTimeProviderService : IDateTimeProvider
    {
        public DateTime UtcNow => DateTime.UtcNow;
        public DateTime TodayUtc => DateTime.UtcNow.Date;
        public int CurrentYearUtc => DateTime.UtcNow.Year;
    }
}
