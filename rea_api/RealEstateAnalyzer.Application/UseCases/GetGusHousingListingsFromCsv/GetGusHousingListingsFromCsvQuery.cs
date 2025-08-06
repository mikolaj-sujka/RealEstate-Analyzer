using MediatR;
using RealEstateAnalyzer.Application.Abstractions;

namespace RealEstateAnalyzer.Application.UseCases.GetGusHousingListingsFromCsv;


public class GetGusHousingListingsFromCsvQuery : IRequest;

public class GetGusHousingListingsFromCsvQueryHandler(IFileParser<Domain.Entities.GusHousingListing> parser)
    : IRequestHandler<GetGusHousingListingsFromCsvQuery>
{
    public async Task Handle(GetGusHousingListingsFromCsvQuery request, CancellationToken cancellationToken)
    {
        await parser.ParseAsync(cancellationToken);
    }
}
