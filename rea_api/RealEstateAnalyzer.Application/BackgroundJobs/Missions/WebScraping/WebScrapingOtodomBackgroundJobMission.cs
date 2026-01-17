using Hangfire;
using Hangfire.MissionControl;
using MediatR;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.AddOrUpdateOtodomHousingListings;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.Application.BackgroundJobs.Missions.WebScraping;


[MissionLauncher(CategoryName = "Web Scraping Otodom")]
[Queue("long-running")]
[AutomaticRetry(Attempts = 1)]
public class WebScrapingOtodomBackgroundJobMission(IJobCancellationToken cancellationToken, 
    IScraper<OtodomOfferRecord> scraper, IMediator mediator, ILogger<WebScrapingOtodomBackgroundJobMission> logger)
{
    [Mission(Name = "Web Scraping Otodom",
        Description = "Scrapes real estate listings from Otodom website.")]
    [DisableConcurrentExecution(60 * 60 * 6)]
    [JobDisplayName("Web Scraping Otodom")]
    public async Task Run()
    {
        try
        {
            var results = await scraper.ScrapeAllAsync(cancellationToken.ShutdownToken);
            if (results.Count == 0)
            {
                throw new InvalidOperationException("No listings found during scraping.");
            }

            await mediator.Send(new AddOrUpdateOtodomHousingListingsCommand(results));
        }
        catch (Polly.CircuitBreaker.BrokenCircuitException<HttpResponseMessage> ex)
        {
            logger.LogWarning(ex, "Circuit OPEN dla HttpClient 'scraper' – przerywam bieg joba.");
            return;
        }
    }
}