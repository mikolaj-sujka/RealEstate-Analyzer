using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomVoivodeshipData;

public record GetOtodomVoivodeshipDataResponse(
    uint TotalOffers,
    decimal AveragePricePerSqm,
    uint AverageBuildingsBuiltYear,
    decimal DeveloperMarketShare);
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
            .Include(otodomHousingListing => otodomHousingListing.PricePerSqm)
            .ToListAsync(cancellationToken);

        if (listings.Count == 0)
        {
            logger.LogWarning("No listings found for voivodeship: {VoivodeshipName}", voivodeshipName);
            return Array.Empty<GetOtodomVoivodeshipDataResponse>();
        }

        var totalOffers = (uint)listings.Count;
        var averagePricePerSqm = listings.Average(x => x.PricePerSqm.Price);
        var averageBuildingsBuiltYear = (uint)listings.Average(x => x.BuildingBuiltYear);
        var developerMarketShare = listings.Count(x => x.IsDeveloperOffer) / (decimal)totalOffers * 100;
        

        return new List<GetOtodomVoivodeshipDataResponse>
        {
            new(totalOffers, averagePricePerSqm, 
                averageBuildingsBuiltYear, developerMarketShare)
        };
    }
}
