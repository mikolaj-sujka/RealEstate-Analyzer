using MediatR;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsFromCsv;


public class GetGusHousingListingsFromCsvQuery : IRequest;

public class GetGusHousingListingsFromCsvQueryHandler(IFileParser<Domain.Entities.GusHousingListing> parser,
    DatabaseContext context)
    : IRequestHandler<GetGusHousingListingsFromCsvQuery>
{
    public async Task Handle(GetGusHousingListingsFromCsvQuery request, CancellationToken cancellationToken)
    {
        var result = await parser.ParseAsync(cancellationToken);

        if (!result.Success)
        {
            var errors = string.Join("\n", result.Errors);
            throw new InvalidOperationException($"Parsing failed with errors:\n{errors}");
        }

        if (result.Records.Count == 0)
        {
            throw new InvalidOperationException("No records found in the CSV files.");
        }

        var listings = result.Records;
        context.GusHousingListings.AddRange(listings);
        await context.SaveChangesAsync(cancellationToken);
    }
}
