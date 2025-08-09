namespace RealEstateAnalyzer.WebScraping.Abstractions;

public interface IScraper<T>
{
    Task<IReadOnlyList<T>> ScrapeAllAsync(CancellationToken ct = default);
    Task<int> DetectTotalPagesAsync(string baseUrl, CancellationToken ct = default);
}