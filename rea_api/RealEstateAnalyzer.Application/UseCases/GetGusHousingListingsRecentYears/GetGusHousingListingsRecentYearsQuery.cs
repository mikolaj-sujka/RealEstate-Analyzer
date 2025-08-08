using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.GetGusHousingListingsRecentYears;

public record GusHousingListingData(
    uint Quarter,
    uint Year,
    decimal MedianPricePerSqm,
    decimal AveragePricePerSqm,
    uint FlatsCompleted,
    uint FlatsSold,
    decimal TotalValueSold,
    decimal AverageTotalPrice
);
public record GetGusHousingListingsRecentYearsQueryResponse(
    IReadOnlyList<GusHousingListingData> Listings
);
public record GetGusHousingListingsRecentYearsQuery(
    string CityName,
    uint Year
) : IRequest<GetGusHousingListingsRecentYearsQueryResponse>;

public class GetGusHousingListingsRecentYearsQueryHandler(DatabaseContext context, 
    ILogger<GetGusHousingListingsRecentYearsQueryHandler> logger) 
    : IRequestHandler<GetGusHousingListingsRecentYearsQuery, GetGusHousingListingsRecentYearsQueryResponse>
{
    public async Task<GetGusHousingListingsRecentYearsQueryResponse> Handle(GetGusHousingListingsRecentYearsQuery request, 
        CancellationToken cancellationToken)
    {
        var latest = await context.GusHousingListings
            .AsNoTracking()
            .Where(l => l.CityName == request.CityName && l.Period.Year == request.Year)
            .OrderByDescending(l => l.Period)
            .Select(l => new GusHousingListingData(
                l.Period.Quarter,
                l.Period.Year,
                l.MedianPricePerSqm.Price,
                l.AveragePricePerSqm.Price,
                l.FlatsCompleted.Count,
                l.FlatsSold.Count,
                l.TotalValueSold.Amount,
                l.AverageTotalPrice.Amount
            )).ToListAsync(cancellationToken: cancellationToken);

        if (latest.Count == 0)         {
            logger.LogWarning("No listings found for city {CityName} in year {Year}", request.CityName, request.Year);
            return new GetGusHousingListingsRecentYearsQueryResponse(new List<GusHousingListingData>());
        }

        logger.LogInformation("Retrieved {Count} listings for city {CityName} in year {Year}", 
            latest.Count, request.CityName, request.Year);

        return new GetGusHousingListingsRecentYearsQueryResponse(latest);
    }
}