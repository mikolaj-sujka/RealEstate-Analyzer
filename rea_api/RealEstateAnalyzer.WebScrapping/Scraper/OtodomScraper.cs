using System.Text.RegularExpressions;
using HtmlAgilityPack;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using RealEstateAnalyzer.WebScrapping;

namespace RealEstateAnalyzer.WebScraping.Scraper;

public class OtodomScraper(ScraperOptions options, IHttpClientFactory httpFactory,
    IOfferParser<OtodomOfferRecord> parser) : IScraper<OtodomOfferRecord>
{
    public async Task<IReadOnlyList<OtodomOfferRecord>> ScrapeAllAsync(CancellationToken ct = default)
    {
        var http = httpFactory.CreateClient("otodom");
        var totalPages = await DetectTotalPagesAsync(options.BaseUrl, ct);
        var maxPages = Math.Min(totalPages, options.MaxPagesHardCap);

        var results = new List<OtodomOfferRecord>(capacity: maxPages * 50);

        for (int page = 1; page <= maxPages; page++)
        {
            ct.ThrowIfCancellationRequested();

            var url = page == 1 ? options.BaseUrl : $"{options.BaseUrl}?page={page}";
            var html = await http.GetStringAsync(url, ct); // retry via Polly handler
            var batch = parser.ParseOffers(html);

            if (batch.Count == 0 && page > 1) break;

            results.AddRange(batch);

            if (options.DelayMsBetweenPages > 0)
                await Task.Delay(options.DelayMsBetweenPages, ct);
        }

        return results;
    }

    private async Task<int> DetectTotalPagesAsync(string baseUrl, CancellationToken ct)
    {
        var http = httpFactory.CreateClient("otodom");
        var html = await http.GetStringAsync(baseUrl, ct);

        // 1) spróbuj JSON osadzony w stronie
        foreach (var p in new[]
                 {
                     "\"totalPages\"\\s*:\\s*(\\d+)",
                     "\"pageCount\"\\s*:\\s*(\\d+)",
                     "\"maxPage\"\\s*:\\s*(\\d+)",
                     "\"total\"\\s*:\\s*(\\d+)"
                 })
        {
            var m = Regex.Match(html, p, RegexOptions.IgnoreCase);
            if (m.Success && int.TryParse(m.Groups[1].Value, out var pages) && pages > 0)
                return Math.Min(pages, options.MaxPagesHardCap);
        }

        // 2) fallback: sprawdź kilka dalszych stron, czy mają oferty
        foreach (var probe in new[] { 100, 50, 20, 10 })
        {
            var u = $"{baseUrl}?page={probe}";
            try
            {
                var testHtml = await http.GetStringAsync(u, ct);
                var doc = new HtmlDocument();
                doc.LoadHtml(testHtml);
                var offers = doc.DocumentNode.SelectNodes("//article"); // HAP
                if (offers is { Count: > 0 }) return Math.Min(probe, options.MaxPagesHardCap);
            }
            catch { /* zignoruj pojedyncze błędy */ }
        }

        return Math.Min(50, options.MaxPagesHardCap);
    }
}