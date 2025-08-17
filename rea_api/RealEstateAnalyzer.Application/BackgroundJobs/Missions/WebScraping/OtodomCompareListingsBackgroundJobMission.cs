using Hangfire;
using Hangfire.MissionControl;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.BackgroundJobs.Missions.WebScraping;

[MissionLauncher(CategoryName = "Web Scraping Otodom")]
[Queue("long-running")]
public class OtodomCompareListingsBackgroundJobMission(IJobCancellationToken cancellationToken, DatabaseContext context,
    ILogger<OtodomCompareListingsBackgroundJobMission> logger)
{
    [Mission(Name = "Compare Otodom Listings",
        Description = "Compares listings with existing ones in the database.")]
    [DisableConcurrentExecution(60 * 60 * 6)]
    [JobDisplayName("Compare Otodom Listings")]
    public async Task Run()
    {
        await CompareListingsAsync(context, cancellationToken.ShutdownToken);
    }

    private async Task CompareListingsAsync(DatabaseContext context, CancellationToken cancellationToken)
    {
        var allListings = await context.OtodomHousingListings
            .ToListAsync(cancellationToken);

        var duplicatedListings = allListings
            .GroupBy(x => x.Url.Url)
            .Where(g => g.Count() > 1)
            .Select(g => new { Url = g.Key, Count = g.Count() }) 
            .ToList();

        if (duplicatedListings.Count == 0)
        {
            logger.LogInformation("No duplicated Otodom listings found.");
            return;
        }

        var idsToKeep = context.OtodomHousingListings
            .GroupBy(x => x.Url) 
            .Select(g => g.OrderByDescending(x => x.CreatedAt)
                .Select(x => x.Id)
                .First());

        var deletedCount = await context.OtodomHousingListings
            .Where(x => !idsToKeep.Contains(x.Id))
            .ExecuteDeleteAsync(cancellationToken);

        logger.LogInformation(
            "Deleted {Count} duplicated Otodom listings. Duplicated URLs: {Urls}",
            deletedCount, 
            string.Join(", ", duplicatedListings.Select(x => x.Url)));
    }
}