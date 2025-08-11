namespace RealEstateAnalyzer.WebScraping.Abstractions;

public interface IOfferParser<T>
{
    Task<IReadOnlyList<T>> ParseOffers(string htmlContent, HttpClient client, CancellationToken cancellationToken);
}