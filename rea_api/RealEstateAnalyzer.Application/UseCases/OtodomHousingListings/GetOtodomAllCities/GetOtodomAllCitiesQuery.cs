using MediatR;
using Microsoft.EntityFrameworkCore;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllCities;

public record GetOtodomAllCitiesQueryResponse(IReadOnlyList<string> Cities);
public record GetOtodomAllCitiesQuery : IRequest<IReadOnlyList<GetOtodomAllCitiesQueryResponse>>;

public class GetOtodomAllCitiesQueryHandler(DatabaseContext context) : IRequestHandler<GetOtodomAllCitiesQuery, IReadOnlyList<GetOtodomAllCitiesQueryResponse>>
{
    public async Task<IReadOnlyList<GetOtodomAllCitiesQueryResponse>> Handle(GetOtodomAllCitiesQuery request, CancellationToken cancellationToken)
    {
        var cities = await context.OtodomHousingListings
            .AsNoTracking()
            .Select(x => x.Location.City)
            .Distinct()
            .ToListAsync(cancellationToken);
        return new List<GetOtodomAllCitiesQueryResponse> { new(cities) };
    }
}
