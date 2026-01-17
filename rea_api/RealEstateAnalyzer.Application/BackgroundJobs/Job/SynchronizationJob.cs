using Hangfire;
using MediatR;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.AddOrUpdateOtodomHousingListings;
using RealEstateAnalyzer.Infrastructure.Http.Policies;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.Application.BackgroundJobs.Job;

public class SynchronizationJob(IMediator mediator, ILogger<SynchronizationJob> logger, IJobCancellationToken cancellationToken,
    IScraper<OtodomOfferRecord> scraper) : ISynchronizationJob
{
    [DisableConcurrentExecution(timeoutInSeconds: 3600)]
    [JobDisplayName("Synchronize Otodom Listing Offers")]
    public async Task Run()
    {
        var retryPolicy = PollyRetryPolicies.PollyRetryPolicy.GetJobRetryPolicy(logger);

        try
        {
            await retryPolicy.ExecuteAsync(async () =>
            {
                logger.LogInformation("Starting synchronization Otodom job...");
                var results = await scraper.ScrapeAllAsync(cancellationToken.ShutdownToken);

                if (results.Count == 0)
                {
                    throw new InvalidOperationException("No listings found during scraping.");
                }

                await mediator.Send(new AddOrUpdateOtodomHousingListingsCommand(results));
                logger.LogInformation("Synchronization job completed successfully.");
            });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Synchronization job failed.");
            throw; // Rethrow to ensure the job is marked as failed in Hangfire
        }
    }
}