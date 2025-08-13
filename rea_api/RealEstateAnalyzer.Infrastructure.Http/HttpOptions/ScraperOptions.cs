namespace RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

public sealed class ScraperOptions
{
    public string BaseUrl { get; set; } = "";
    public int MaxPagesToScrape { get; set; } = 0;
    public string UserAgent { get; set; } = "";

    public int MaxParallelRequests { get; set; } = 0;
    public int MinJitterMs { get; set; } = 0;
    public int MaxJitterMs { get; set; } = 0;
}