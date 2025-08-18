using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Domain.ValueObjects;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsRecentYears;

public record GusHousingListingDto(
    string CityName,
    string CityCode,
    QuarterPeriod Period,
    PricePerSquareMeter MedianPricePerSqm,
    PricePerSquareMeter AveragePricePerSqm,
    Money TotalValueSold,
    Money AverageTotalPrice,
    Volume FlatsCompleted,
    Volume FlatsSold
);
public record GusHousingListingData(
    string CityCode,
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
    uint YearsBack
) : IRequest<GetGusHousingListingsRecentYearsQueryResponse>;

public class GetGusHousingListingsRecentYearsQueryHandler(DatabaseContext context, 
    ILogger<GetGusHousingListingsRecentYearsQueryHandler> logger) 
    : IRequestHandler<GetGusHousingListingsRecentYearsQuery, GetGusHousingListingsRecentYearsQueryResponse>
{
    public async Task<GetGusHousingListingsRecentYearsQueryResponse> Handle(GetGusHousingListingsRecentYearsQuery request, 
        CancellationToken cancellationToken)
    {
        var allListingsForCity = await context.GusHousingListings
            .AsNoTracking()
            .Where(l => l.CityName.Contains(request.CityName.ToLower()))
            .Select(l => new GusHousingListingDto(
                l.CityName,
                l.CityCode,
                l.Period,
                l.MedianPricePerSqm,
                l.AveragePricePerSqm,
                l.TotalValueSold,
                l.AverageTotalPrice,
                l.FlatsCompleted,
                l.FlatsSold
            ))
            .ToListAsync(cancellationToken: cancellationToken);

        if (!allListingsForCity.Any())
        {
            logger.LogWarning("No listings found for city {CityName}.", 
                request.CityName);

            return new GetGusHousingListingsRecentYearsQueryResponse(new List<GusHousingListingData>());
        }

        uint maxYear = allListingsForCity.Max(l => l.Period.Year);
        long minYear = maxYear - (int)request.YearsBack;


        var latest = allListingsForCity
            .Where(l => l.Period.Year >= minYear && l.Period.Year <= maxYear)
            .OrderByDescending(l => l.Period.Year)
            .ThenByDescending(l => l.Period.Quarter)
            .Select(l => new GusHousingListingData(
                l.CityCode,
                l.Period.Quarter,
                l.Period.Year,
                l.MedianPricePerSqm.Price,
                l.AveragePricePerSqm.Price,
                l.FlatsCompleted.Count,
                l.FlatsSold.Count,
                l.TotalValueSold.Amount,
                l.AverageTotalPrice.Amount
            ))
            .ToList();

        logger.LogInformation("Retrieved {Count} listings for city {CityName} in years back {YearsBack}", 
            latest.Count, request.CityName, request.YearsBack);

        return new GetGusHousingListingsRecentYearsQueryResponse(latest);
    }
}