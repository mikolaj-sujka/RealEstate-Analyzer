using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Validators;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityDistricts;

public record OtodomCityDisctrictModel(
    decimal AveragePricePerSqm,
    uint AverageBuildingBuiltYear,
    uint TotalBuildingOffers,
    string District,
    decimal AverageFlatSize);
public record GetOtodomCityDistrictsQueryResponse(IReadOnlyList<OtodomCityDisctrictModel> CityDisctricts);
public record GetOtodomCityDistrictsQuery(string CityName) : IRequest<IReadOnlyList<GetOtodomCityDistrictsQueryResponse>>;

public class GetOtodomCityDistrictsQueryHandler(DatabaseContext context, ILogger<GetOtodomCityDistrictsQueryHandler> logger) 
    : IRequestHandler<GetOtodomCityDistrictsQuery, IReadOnlyList<GetOtodomCityDistrictsQueryResponse>>
{
    public async Task<IReadOnlyList<GetOtodomCityDistrictsQueryResponse>> Handle(GetOtodomCityDistrictsQuery request, CancellationToken cancellationToken)
    {
        var cityName = request.CityName?.Trim();
        if (string.IsNullOrWhiteSpace(cityName))
        {
            logger.LogWarning("City name is empty or null.");
            return Array.Empty<GetOtodomCityDistrictsQueryResponse>();
        }

        var listingCityData = await context.OtodomHousingListings
            .AsNoTracking()
            .Where(x => x.Location.City == cityName)
            .Select(x => new
            {
                District = x.Location.District!,                          
                Price = (decimal?)x.PricePerSqm.Price,                    
                Year = (int?)x.BuildingBuiltYear,                          
                Size = (decimal?)x.FlatSize.SquareMeters                   
            })
            .GroupBy(x => x.District)

            .ToListAsync(cancellationToken);

        if (listingCityData.Count == 0)
        {
            logger.LogWarning("No listings found for city: {CityName}", cityName);
            return Array.Empty<GetOtodomCityDistrictsQueryResponse>();
        }

        var districtData = listingCityData.Select(g => 
            new OtodomCityDisctrictModel(
                AveragePricePerSqm: g.Average(x => x.Price) ?? 0,
                AverageBuildingBuiltYear: (uint)(g.Average(x => x.Year) ?? 0),
                TotalBuildingOffers: (uint)g.Count(),
                District: g.Key,
                AverageFlatSize: g.Average(x => x.Size) ?? 0
            ))
            .DistinctBy(x => x.District)
            .ToList();


        return new List<GetOtodomCityDistrictsQueryResponse> { new(districtData) };
    }
}

public class GetOtodomCityDistrictsQueryValidator : AbstractValidator<GetOtodomCityDistrictsQuery>
{
    public GetOtodomCityDistrictsQueryValidator()
    {
        RuleFor(x => x.CityName)
            .CityNameCorrectConvention();
    }
}