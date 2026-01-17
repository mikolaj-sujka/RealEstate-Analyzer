using MediatR;
using Microsoft.EntityFrameworkCore;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllCities;

public record GetOtodomAllCitiesQueryResponse(IReadOnlyList<string> Cities);
public record GetOtodomAllCitiesQuery : IRequest<GetOtodomAllCitiesQueryResponse>;

public class GetOtodomAllCitiesQueryHandler(DatabaseContext context) : IRequestHandler<GetOtodomAllCitiesQuery, GetOtodomAllCitiesQueryResponse>
{
    public async Task<GetOtodomAllCitiesQueryResponse> Handle(GetOtodomAllCitiesQuery request, CancellationToken cancellationToken)
    {
        var cities = await context.OtodomHousingListings
            .AsNoTracking()
            .Select(x => x.Location.City)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync(cancellationToken);

        return new GetOtodomAllCitiesQueryResponse ( cities );
    }
}
