using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Extensions;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityData;

public record GetOtodomCityDataListingsResponse(uint TotalOffers, decimal AveragePricePerSqm, 
    uint AverageBuildingsBuiltYear, decimal DeveloperMarketShaers);
public record GetOtodomCityDataListingsQuery(string CityName) : IRequest<IReadOnlyList<GetOtodomCityDataListingsResponse>>;

public class GetOtodomCityDataListingsQueryHandler(DatabaseContext databaseContext, 
    ILogger<GetOtodomCityDataListingsQueryHandler> logger) : IRequestHandler<GetOtodomCityDataListingsQuery, 
    IReadOnlyList<GetOtodomCityDataListingsResponse>>
{
    public async Task<IReadOnlyList<GetOtodomCityDataListingsResponse>> Handle(GetOtodomCityDataListingsQuery request, 
        CancellationToken cancellationToken)
    {
        var cityName = request.CityName.Trim().ToLowerInvariant();
        var listings = await databaseContext.OtodomHousingListings
            .Where(x => x.Location.City.Equals(cityName))
            .AsSplitQuery()
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        if (listings.Count == 0)
        {
            logger.LogWarning("No listings found for city: {CityName}", cityName);
            return Array.Empty<GetOtodomCityDataListingsResponse>();
        }

        var totalOffers = (uint)listings.Count;

        var prices = listings.Select(x => x.PricePerSqm.Price);
        var years = listings.Select(x => (int?)x.BuildingBuiltYear);


        var averagePricePerSqm = prices.AverageIgnoreZero();
        var averageBuildingsBuiltYear = years.AverageYearIgnoreZero();
        var developerMarketShare = totalOffers == 0 ? 0m
            : listings.Count(x => x.IsDeveloperOffer) / (decimal)totalOffers * 100m;

        var medianPricePerSqm = prices.MedianIgnoreZero();

        return new List<GetOtodomCityDataListingsResponse>
        {
            new(totalOffers, averagePricePerSqm, 
                averageBuildingsBuiltYear, developerMarketShare)
        };
    }
}
