using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomLatestTransactions;

public record OtodomLatestTransactionsModel(string City, string Voivodeship, DateTime WebScrapedDate, decimal Price, 
    string PropertyType, string MarketType);
public record GetOtodomLatestTransactionsQuery : IRequest<IReadOnlyList<OtodomLatestTransactionsModel>>;

public class GetOtodomLatestTransactionsQueryHandler(DatabaseContext context, ILogger<GetOtodomLatestTransactionsQueryHandler> logger) 
    : IRequestHandler<GetOtodomLatestTransactionsQuery, IReadOnlyList<OtodomLatestTransactionsModel>>
{
    public async Task<IReadOnlyList<OtodomLatestTransactionsModel>> Handle(GetOtodomLatestTransactionsQuery request, CancellationToken cancellationToken)
    {
        var latestTransactions = await context.OtodomHousingListings
            .AsNoTracking()
            .OrderBy(x => x.DateWebScraped)
            .Select(x => new OtodomLatestTransactionsModel(
                x.Location.City,
                x.Location.Voivodeship,
                x.DateWebScraped,
                x.TotalPrice.Amount,
                x.PropertyType.ToString(),
                x.MarketType.ToString()))
            .Take(100)
            .ToListAsync(cancellationToken);

        if (latestTransactions.Count == 0)
        {
            logger.LogWarning("No Otodom latest transactions found.");
            return new List<OtodomLatestTransactionsModel>();
        }

        return latestTransactions;
    }
}
