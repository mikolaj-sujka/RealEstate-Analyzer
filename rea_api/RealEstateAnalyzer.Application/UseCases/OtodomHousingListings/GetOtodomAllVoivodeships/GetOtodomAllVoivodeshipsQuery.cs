using MediatR;
using Microsoft.EntityFrameworkCore;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllVoivodeships;

public record GetOtodomAllVoivodeshipsQueryResponse(IReadOnlyList<string> Voivodeships);
public record GetOtodomAllVoivodeshipsQuery : IRequest<IReadOnlyList<GetOtodomAllVoivodeshipsQueryResponse>>;

public class GetOtodomAllVoivodeshipsQueryHandler(DatabaseContext context) 
    : IRequestHandler<GetOtodomAllVoivodeshipsQuery, IReadOnlyList<GetOtodomAllVoivodeshipsQueryResponse>>
{
    public async Task<IReadOnlyList<GetOtodomAllVoivodeshipsQueryResponse>> Handle(GetOtodomAllVoivodeshipsQuery request, CancellationToken cancellationToken)
    {
        var voivodeships = await context.OtodomHousingListings
            .AsNoTracking()
            .Select(x => x.Location.Voivodeship)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync(cancellationToken);
        return new List<GetOtodomAllVoivodeshipsQueryResponse> { new(voivodeships) };
    }
}
