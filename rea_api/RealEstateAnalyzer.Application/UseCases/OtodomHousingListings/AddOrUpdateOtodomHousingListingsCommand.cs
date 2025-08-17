using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.ValueObjects;
using RealEstateAnalyzer.Infrastructure;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings;

public record AddOrUpdateOtodomHousingListingsCommand(IReadOnlyList<OtodomOfferRecord> Listings) : IRequest;

public class AddOrUpdateOtodomHousingListingsCommandHandler(
    DatabaseContext context, ILogger<AddOrUpdateOtodomHousingListingsCommandHandler> logger) : IRequestHandler<AddOrUpdateOtodomHousingListingsCommand>
{
    public async Task Handle(AddOrUpdateOtodomHousingListingsCommand request, CancellationToken cancellationToken)
    {
        var otodomListings = request.Listings.Select(x => 
            OtodomHousingListing.Create(
                ListingUrl.FromString(x.Url), 
                Location.FromStrings(x.City, x.District, x.Voivodeship),
                x.DatePublished,
                x.DateWebScraped,
                Money.FromDecimal(x.TotalPrice),
                Area.FromDecimal(x.FlatSize),
                PricePerSquareMeter.FromDecimal(x.PricePerSquareMeter),
                x.Title,
                x.BuildingBuiltYear,
                PropertyTypeExtensions.FromString(x.PropertyType),
                x.MarketType,
                ListingStatusExtensions.FromString(x.Status),
                x.IsDeveloperOffer)).ToList();

        if (otodomListings.Count == 0)
        {
            throw new InvalidOperationException("No listings to add or update.");
        }

        await AddOrUpdateOtodomListingsAsync(otodomListings, cancellationToken);
        await RemoveOtodomListingsAsync(otodomListings, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);
    }

    private async Task AddOrUpdateOtodomListingsAsync(IReadOnlyList<OtodomHousingListing> listings, CancellationToken cancellationToken)
    {
        var updatedRecords = 0;
        var addedRecords = 0;

        var incomingUrls = listings
            .Select(l => l.Url)
            .Distinct()
            .ToList();

        var existingListings = await context.OtodomHousingListings
            .Where(x => incomingUrls.Contains(x.Url))
            .ToListAsync(cancellationToken);

        var byUrl = existingListings
            .ToDictionary(x => x.Url.Url, StringComparer.OrdinalIgnoreCase);

        foreach (var listing in listings)
        {

            if (byUrl.TryGetValue(listing.Url.Url, out var ex))
            {
                bool same =
                    ex.Url == listing.Url &&
                    ex.Location == listing.Location &&
                    ex.DatePublished == listing.DatePublished &&
                    ex.TotalPrice == listing.TotalPrice &&
                    ex.FlatSize == listing.FlatSize &&
                    ex.PricePerSqm == listing.PricePerSqm &&
                    ex.Title == listing.Title &&
                    ex.BuildingBuiltYear == listing.BuildingBuiltYear &&
                    ex.PropertyType == listing.PropertyType &&
                    ex.MarketType == listing.MarketType &&
                    ex.Status == listing.Status &&
                    ex.IsDeveloperOffer == listing.IsDeveloperOffer;

                if (same) continue;

                ex.Update(
                    listing.Url,
                    listing.Location,
                    listing.DatePublished,
                    listing.DateWebScraped,
                    listing.TotalPrice,
                    listing.FlatSize,
                    listing.PricePerSqm,
                    listing.Title,
                    listing.BuildingBuiltYear,
                    listing.PropertyType,
                    listing.MarketType,
                    listing.Status,
                    listing.IsDeveloperOffer
                );
                updatedRecords++;
            }
            else
            {
                context.OtodomHousingListings.Add(listing);
                addedRecords++;
            }
        }

        logger.LogInformation("Records added: {addedRecordsCount}, record updated {updatedRecordsCount}", addedRecords, updatedRecords);
    }

    private async Task RemoveOtodomListingsAsync(IReadOnlyList<OtodomHousingListing> listings, CancellationToken cancellationToken)
    {
        var incomingUrls = listings.Select(l => l.Url.Url).ToHashSet(StringComparer.Ordinal);

        var urlsInDb = await context.OtodomHousingListings
            .Select(x => x.Url.Url)
            .ToListAsync(cancellationToken);

        var toDelete = urlsInDb.Where(url => !incomingUrls.Contains(url)).ToList();

        foreach (var batch in toDelete.Chunk(1000))
        {
            await context.OtodomHousingListings
                .Where(x => batch.Contains(x.OfferId))
                .ExecuteDeleteAsync(cancellationToken);
        }
    }
}
