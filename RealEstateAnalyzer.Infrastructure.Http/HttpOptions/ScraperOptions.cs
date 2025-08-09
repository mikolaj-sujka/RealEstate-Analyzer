namespace RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

public sealed class ScraperOptions
{
    public string BaseUrl { get; set; } = "";
    public int MaxPagesToScrape { get; set; } = 5000;
    public int DelayMsBetweenPages { get; set; } = 1000;
    public string UserAgent { get; set; } = "";
}