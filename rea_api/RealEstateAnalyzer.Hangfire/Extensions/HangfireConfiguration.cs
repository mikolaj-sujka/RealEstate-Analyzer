namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

public sealed class HangfireConfiguration
{
    public bool Enabled { get; set; }
    public IDictionary<string, string?>? Crons { get; set; }
    public int LongRunningQueueWorkersCount { get; set; }
}