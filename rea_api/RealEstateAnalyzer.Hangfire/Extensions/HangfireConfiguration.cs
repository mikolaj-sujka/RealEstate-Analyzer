namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

public sealed class HangfireConfiguration
{
    public bool Enabled { get; set; }
    public int LongRunningQueueWorkersCount { get; set; }
    public string? SyncOtodom { get; set; } = "0 1 * * *";
}

public sealed class HangfireJobOption
{
    public string Cron { get; init; } = "0 1 * * *";
    public string? Queue { get; init; } = "default";
    public string? TimeZone { get; init; } = "Europe/Warsaw";
}

public sealed class HangfireJobsOptions
{
    public Dictionary<string, HangfireJobOption> Jobs { get; init; } = new();
}