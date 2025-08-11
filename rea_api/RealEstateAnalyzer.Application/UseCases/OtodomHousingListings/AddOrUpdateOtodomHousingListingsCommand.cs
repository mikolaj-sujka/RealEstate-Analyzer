using MediatR;
using Microsoft.EntityFrameworkCore;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.ValueObjects;
using RealEstateAnalyzer.Infrastructure;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings;

public record AddOrUpdateOtodomHousingListingsCommand(IReadOnlyList<OtodomOfferRecord> Listings) : IRequest;

public class AddOrUpdateOtodomHousingListingsCommandHandler(
    DatabaseContext context) : IRequestHandler<AddOrUpdateOtodomHousingListingsCommand>
{
    public async Task Handle(AddOrUpdateOtodomHousingListingsCommand request, CancellationToken cancellationToken)
    {
        var otodomListings = request.Listings.Select(x => 
            OtodomHousingListing.Create(
                ListingUrl.FromString(x.Url), 
                Location.FromStrings(x.City, x.District),
                x.DatePublished,
                x.DateWebScraped,
                Money.FromDecimal(x.TotalPrice),
                Area.FromDecimal(x.FlatSize),
                PricePerSquareMeter.FromDecimal(x.PricePerSquareMeter),
                x.Title,
                PropertyTypeExtensions.FromString(x.PropertyType),
                MarketTypeExtensions.FromString(x.MarketType),
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
        var existingListings = await context.OtodomHousingListings
            .Where(x => listings.Select(l => l.OfferId).Contains(x.OfferId))
            .ToListAsync(cancellationToken);

        foreach (var listing in listings)
        {
            var existing = existingListings.FirstOrDefault(x => x.OfferId == listing.OfferId);

            if (existing is not null)
            {

                if (existing.GetHashCode() == listing.GetHashCode())
                {
                    continue;
                }

                // Update existing listing
                existing.Update(
                    listing.Url,
                    listing.Location,
                    listing.DatePublished,
                    listing.DateWebScraped,
                    listing.TotalPrice,
                    listing.FlatSize,
                    listing.PricePerSqm,
                    listing.Title,
                    listing.PropertyType,
                    listing.MarketType,
                    listing.Status,
                    listing.IsDeveloperOffer);

            }
            else
            {
                context.OtodomHousingListings.Add(listing);
            }
        }
    }

    private async Task RemoveOtodomListingsAsync(IReadOnlyList<OtodomHousingListing> listings, CancellationToken cancellationToken)
    {
        var incomingIds = listings.Select(l => l.OfferId).ToHashSet(StringComparer.Ordinal);

        var idsInDb = await context.OtodomHousingListings
            .Select(x => x.OfferId)
            .ToListAsync(cancellationToken);

        var toDelete = idsInDb.Where(id => !incomingIds.Contains(id)).ToList();

        foreach (var batch in toDelete.Chunk(1000))
        {
            await context.OtodomHousingListings
                .Where(x => batch.Contains(x.OfferId))
                .ExecuteDeleteAsync(cancellationToken);
        }
    }
}
