using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        var cityName = request.CityName.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(cityName))
        {
            logger.LogWarning("City name is empty or null.");
            return Array.Empty<GetOtodomCityDistrictsQueryResponse>();
        }

        var districtData = await context.OtodomHousingListings
            .AsNoTracking()
            .AsSplitQuery()
            .Include(x => x.PricePerSqm)
            .Include(x => x.FlatSize)
            .Where(x =>
                x.Location.City == request.CityName && x.Location.District.Any())
            .GroupBy(x => x.Location.District!)
            .Select(g => new OtodomCityDisctrictModel(
                (g.Average(x => (decimal?)x.PricePerSqm.Price) ?? 0m),
                (uint)(g.Average(x => (int?)(x.BuildingBuiltYear)) ?? 0),
                (uint)g.Count(),
                g.Key,
                (g.Average(x => (decimal?)x.FlatSize.SquareMeters) ?? 0m)
            ))
            .OrderBy(m => m.District)
            .ToListAsync(cancellationToken);

        return new List<GetOtodomCityDistrictsQueryResponse> { new(districtData) };
    }
}
