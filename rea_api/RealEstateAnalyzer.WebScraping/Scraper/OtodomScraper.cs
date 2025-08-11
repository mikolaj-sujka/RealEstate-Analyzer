using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;

namespace RealEstateAnalyzer.WebScraping.Scraper;

public class OtodomScraper(IOptions<ScraperOptions> options, IHttpClientFactory httpFactory,
    IOfferParser<OtodomOfferRecord> parser) : IScraper<OtodomOfferRecord>
{
    private readonly ScraperOptions _options = options.Value;
    public async Task<IReadOnlyList<OtodomOfferRecord>> ScrapeAllAsync(CancellationToken ct = default)
    {
        var http = httpFactory.CreateClient("otodom");
        var totalPages = await DetectTotalPagesAsync(_options.BaseUrl, ct);
        var maxPages = Math.Min(totalPages, _options.MaxPagesToScrape);

        var results = new List<OtodomOfferRecord>(capacity: maxPages * 50);

        for (int page = 1; page <= maxPages; page++)
        {
            ct.ThrowIfCancellationRequested();

            var url = page == 1 ? _options.BaseUrl : $"{_options.BaseUrl}?page={page}";
            var html = await http.GetStringAsync(url, ct); 
            var batch = await parser.ParseOffers(html, http, ct);

            if (batch.Count == 0 && page > 1) break;

            results.AddRange(batch);

            if (_options.DelayMsBetweenPages > 0)
                await Task.Delay(_options.DelayMsBetweenPages, ct);
        }

        return results;
    }

    public async Task<int> DetectTotalPagesAsync(string baseUrl, CancellationToken ct)
    {
        var http = httpFactory.CreateClient("otodom");
        var html = await http.GetStringAsync(baseUrl, ct);

        var maxToScrape = _options.MaxPagesToScrape > 0 ? _options.MaxPagesToScrape : int.MaxValue;

        if (TryParseTotalPagesFromHtml(html, out var pagesFromJson) && pagesFromJson > 0)
            return Math.Min(pagesFromJson, maxToScrape);

        int lo = 1, hi = 1;
        while (hi < maxToScrape && await PageHasOffers(http, baseUrl, hi, ct))
        {
            lo = hi;
            hi = hi * 2;
            if (hi > maxToScrape) hi = maxToScrape;
        }

        if (lo == 1 && hi == 1 && !await PageHasOffers(http, baseUrl, 1, ct))
            return 0;

        while (lo + 1 < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (await PageHasOffers(http, baseUrl, mid, ct)) lo = mid;
            else hi = mid;
        }

        return lo; 
    }

    private static bool TryParseTotalPagesFromHtml(string html, out int totalPages)
    {
        totalPages = 0;

        foreach (var p in new[] { "\"totalPages\"\\s*:\\s*(\\d+)", "\"pageCount\"\\s*:\\s*(\\d+)", "\"maxPage\"\\s*:\\s*(\\d+)" })
        {
            var m = Regex.Match(html, p, RegexOptions.IgnoreCase);
            if (m.Success && int.TryParse(m.Groups[1].Value, out totalPages)) return true;
        }

        var totalM = Regex.Match(html, "\"total\"\\s*:\\s*(\\d+)", RegexOptions.IgnoreCase);
        var sizeM = Regex.Match(html, "\"pageSize\"\\s*:\\s*(\\d+)|\"limit\"\\s*:\\s*(\\d+)", RegexOptions.IgnoreCase);
        if (totalM.Success && int.TryParse(totalM.Groups[1].Value, out var total) && total > 0)
        {
            var sizeGroup = sizeM.Groups.Cast<Group>().Skip(1).FirstOrDefault(g => g.Success)?.Value;
            if (sizeGroup != null && int.TryParse(sizeGroup, out var pageSize) && pageSize > 0)
            {
                totalPages = (int)Math.Ceiling(total / (double)pageSize);
                return true;
            }
        }

        return false;
    }

    private static async Task<bool> PageHasOffers(HttpClient http, string baseUrl, int page, CancellationToken ct)
    {
        var url = page <= 1 ? baseUrl : $"{baseUrl}?page={page}";
        var html = await http.GetStringAsync(url, ct);

        var doc = new HtmlAgilityPack.HtmlDocument();
        doc.LoadHtml(html);

        var articles = doc.DocumentNode.SelectNodes("//article");
        if (articles is { Count: > 0 }) return true;

        if (doc.DocumentNode.InnerText.Contains("Nie znaleziono", StringComparison.OrdinalIgnoreCase)) return false;

        return false;
    }
}