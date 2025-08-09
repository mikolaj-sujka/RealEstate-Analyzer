using System.Text.RegularExpressions;
using HtmlAgilityPack;
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
        var maxPages = Math.Min(totalPages, _options.MaxPagesHardCap);

        var results = new List<OtodomOfferRecord>(capacity: maxPages * 50);

        for (int page = 1; page <= maxPages; page++)
        {
            ct.ThrowIfCancellationRequested();

            var url = page == 1 ? _options.BaseUrl : $"{_options.BaseUrl}?page={page}";
            var html = await http.GetStringAsync(url, ct); // retry via Polly handler
            var batch = parser.ParseOffers(html);

            if (batch.Count == 0 && page > 1) break;

            results.AddRange(batch);

            if (_options.DelayMsBetweenPages > 0)
                await Task.Delay(_options.DelayMsBetweenPages, ct);
        }

        return results;
    }

    private async Task<int> DetectTotalPagesAsync(string baseUrl, CancellationToken ct)
    {
        var http = httpFactory.CreateClient("otodom");
        var html = await http.GetStringAsync(baseUrl, ct);

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
                return Math.Min(pages, _options.MaxPagesHardCap);
        }

        foreach (var probe in new[] { 100, 50, 20, 10 })
        {
            var u = $"{baseUrl}?page={probe}";
            try
            {
                var testHtml = await http.GetStringAsync(u, ct);
                var doc = new HtmlDocument();
                doc.LoadHtml(testHtml);
                var offers = doc.DocumentNode.SelectNodes("//article"); // HAP
                if (offers is { Count: > 0 }) return Math.Min(probe, _options.MaxPagesHardCap);
            }
            catch { }
        }

        return Math.Min(50, _options.MaxPagesHardCap);
    }
}