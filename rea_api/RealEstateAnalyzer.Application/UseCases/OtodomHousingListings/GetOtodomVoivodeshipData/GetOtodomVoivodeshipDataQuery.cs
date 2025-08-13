using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Extensions;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomVoivodeshipData;

public record GetOtodomVoivodeshipDataResponse(
    uint TotalOffers,
    decimal AveragePricePerSqm,
    uint AverageBuildingsBuiltYear,
    decimal DeveloperMarketShare,
    decimal PrimaryMarketShare,
    decimal MedianPricePerSqm);
public record GetOtodomVoivodeshipDataQuery(string VoivodeshipName) 
    : IRequest<IReadOnlyList<GetOtodomVoivodeshipDataResponse>>;

public class GetOtodomVoivodeshipDataQueryHandler(DatabaseContext databaseContext, 
    ILogger<GetOtodomVoivodeshipDataQueryHandler> logger)
    : IRequestHandler<GetOtodomVoivodeshipDataQuery, IReadOnlyList<GetOtodomVoivodeshipDataResponse>>
{
    public async Task<IReadOnlyList<GetOtodomVoivodeshipDataResponse>> Handle(GetOtodomVoivodeshipDataQuery request, CancellationToken cancellationToken)
    {
        var voivodeshipName = request.VoivodeshipName.Trim().ToLowerInvariant();
        var listings = await databaseContext.OtodomHousingListings
            .Where(x => x.Location.Voivodeship.Equals(voivodeshipName))
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        if (listings.Count == 0)
        {
            logger.LogWarning("No listings found for voivodeship: {VoivodeshipName}", voivodeshipName);
            return Array.Empty<GetOtodomVoivodeshipDataResponse>();
        }

        var totalOffers = (uint)listings.Count;

        var prices = listings.Select(x => x.PricePerSqm.Price);
        var years = listings.Select(x => (int?)x.BuildingBuiltYear);

        var averagePricePerSqm = prices.AverageIgnoreZero();
        var averageBuildingsBuiltYear = years.AverageYearIgnoreZero();
        var medianPricePerSqm = prices.MedianIgnoreZero();

        var developerMarketShare = totalOffers == 0 ? 0m
            : listings.Count(x => x.IsDeveloperOffer) / (decimal)totalOffers * 100m;

        var primaryMarketShare = totalOffers == 0 ? 0m
            : listings.Count(x => x.MarketType == MarketType.PrimaryMarket) / (decimal)totalOffers * 100m;

        return new List<GetOtodomVoivodeshipDataResponse>
        {
            new(
                TotalOffers: totalOffers,
                AveragePricePerSqm: averagePricePerSqm,
                AverageBuildingsBuiltYear: averageBuildingsBuiltYear,
                DeveloperMarketShare: developerMarketShare,
                PrimaryMarketShare: primaryMarketShare,
                MedianPricePerSqm: medianPricePerSqm
            )
        };
    }
}
