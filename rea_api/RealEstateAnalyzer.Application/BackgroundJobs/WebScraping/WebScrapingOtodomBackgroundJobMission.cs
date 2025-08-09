using Hangfire;
using Hangfire.MissionControl;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.Application.BackgroundJobs.WebScraping;


[MissionLauncher(CategoryName = "Web Scraping Otodom")]
[Queue("long-running")]
public class WebScrapingOtodomBackgroundJobMission(IJobCancellationToken cancellationToken, 
    IScraper<OtodomOfferRecord> scraper)
{
    [Mission(Name = "Web Scraping Otodom",
        Description = "Scrapes real estate listings from Otodom website.")]
    [DisableConcurrentExecution(60 * 60 * 6)]
    [JobDisplayName("Web Scraping Otodom")]
    public async Task Run()
    {
        var results = await scraper.ScrapeAllAsync(cancellationToken.ShutdownToken);
    }
}