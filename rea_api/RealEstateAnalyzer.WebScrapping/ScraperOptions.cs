namespace RealEstateAnalyzer.WebScrapping;

public sealed class ScraperOptions
{
    public string BaseUrl { get; set; } = "";
    public int MaxPagesHardCap { get; set; } = 100;
    public int DelayMsBetweenPages { get; set; } = 1000;
    public string UserAgent { get; set; } = "";
}