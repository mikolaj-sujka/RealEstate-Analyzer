using Hangfire;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

namespace RealEstateAnalyzer.Infrastructure.Hangfire.Services;

public sealed class RecurringJobsHostedService(
    IRecurringJobManager jobs,
    HangfireConfiguration configuration,
    ILogger<RecurringJobsHostedService> logger)
    : BackgroundService
{
    private const int MaxAttempts = 5;
    private static readonly TimeSpan InitialDelay = TimeSpan.FromSeconds(2);
    private static readonly TimeSpan MaxBackoff = TimeSpan.FromSeconds(30);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (configuration is not { Enabled: true })
        {
            logger.LogInformation("Hangfire jobs are disabled (Hangfire:Enabled = false) — skipping registration.");
            return;
        }

        await Task.Delay(InitialDelay, stoppingToken);

        var attempt = 0;
        Exception? lastError = null;

        try
        {
            GlobalJobFilters.Filters.Add(new AutomaticRetryAttribute { Attempts = 0 });
        }
        catch (Exception ex)
        {
            logger.LogDebug(ex, "AutomaticRetry filter already configured or failed to set — continuing.");
        }

        while (attempt < MaxAttempts && !stoppingToken.IsCancellationRequested)
        {
            attempt++;
            try
            {
                RegisterRecurringJobs();
                logger.LogInformation("Hangfire recurring jobs registered (attempt {Attempt}).", attempt);
                return;
            }
            catch (Exception ex)
            {
                lastError = ex;
                var backoff = TimeSpan.FromSeconds(Math.Min(InitialDelay.TotalSeconds * Math.Pow(2, attempt), MaxBackoff.TotalSeconds));
                logger.LogWarning(ex,
                    "Failed to register Hangfire jobs (attempt {Attempt}/{Max}). Retrying in {Delay}...",
                    attempt, MaxAttempts, backoff);

                try { await Task.Delay(backoff, stoppingToken); }
                catch (TaskCanceledException) { /* stop requested */ }
            }
        }

        if (lastError != null)
        {
            logger.LogError(lastError, "Giving up registering Hangfire jobs after {Max} attempts.", MaxAttempts);
        }
    }

    private void RegisterRecurringJobs()
    {
        jobs.AddOrUpdate<ISynchronizationJob>(
            recurringJobId: "OtodomSync",
            methodCall: j => j.Run(),
            cronExpression: configuration.SyncOtodom,
            options: new RecurringJobOptions
            {
                TimeZone = TimeZoneInfo.Local
            }
        );

        logger.LogInformation("Recurring jobs configured.");
    }
}