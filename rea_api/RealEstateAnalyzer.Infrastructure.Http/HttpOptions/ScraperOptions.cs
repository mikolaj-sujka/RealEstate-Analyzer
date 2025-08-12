namespace RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

public sealed class ScraperOptions
{
    public string BaseUrl { get; set; } = "";
    public int MaxPagesToScrape { get; set; } = 10;
    public string UserAgent { get; set; } = "";

    public int MaxParallelRequests { get; init; } = 3; 
    public int MinJitterMs { get; init; } = 200;
    public int MaxJitterMs { get; init; } = 700;
}