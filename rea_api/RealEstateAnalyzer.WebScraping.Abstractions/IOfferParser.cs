namespace RealEstateAnalyzer.WebScraping.Abstractions;

public interface IOfferParser<out T>
{
    IReadOnlyList<T> ParseOffers(string htmlContent);
}