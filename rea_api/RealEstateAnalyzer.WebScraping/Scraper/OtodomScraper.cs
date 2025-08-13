using Microsoft.Extensions.Options;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using System.Collections.Concurrent;
using System.Net;
using System.Text.RegularExpressions;

namespace RealEstateAnalyzer.WebScraping.Scraper;

public class OtodomScraper(IOptions<ScraperOptions> options, IHttpClientFactory httpFactory,
    IOfferParser<OtodomOfferRecord> parser) : IScraper<OtodomOfferRecord>
{
    private readonly ScraperOptions _options = options.Value;

    public async Task<IReadOnlyList<OtodomOfferRecord>> ScrapeAllAsync(CancellationToken ct = default)
    {
        var http = httpFactory.CreateClient("scraper");
        var totalPages = await DetectTotalPagesAsync(_options.BaseUrl, ct);
        var maxPages = Math.Min(totalPages, _options.MaxPagesToScrape);

        var results = new ConcurrentBag<OtodomOfferRecord>();

        var parallelOptions = new ParallelOptions
        {
            CancellationToken = ct,
            MaxDegreeOfParallelism = _options.MaxParallelRequests
        };

        var rnd = new Random();

        var pages = Enumerable.Range(1, maxPages).ToList();

        await Parallel.ForEachAsync(pages, parallelOptions, async (page, token) =>
        {
            var url = page == 1 ? _options.BaseUrl : $"{_options.BaseUrl}?page={page}";

            await Task.Delay(rnd.Next(_options.MinJitterMs, _options.MaxJitterMs), token);

                try
                {
                    using var req = new HttpRequestMessage(HttpMethod.Get, url);
                    req.VersionPolicy = HttpVersionPolicy.RequestVersionOrLower;
                    req.Headers.Referrer = new Uri(_options.BaseUrl);

                    using var resp = await http.SendAsync(
                        req,
                        HttpCompletionOption.ResponseHeadersRead,
                        token);

                    if (resp.StatusCode == (HttpStatusCode)429 ||
                        resp.StatusCode == HttpStatusCode.Forbidden ||
                        (int)resp.StatusCode >= 500)
                    {
                        var wait =  TimeSpan.FromMilliseconds(rnd.Next(_options.MinJitterMs, _options.MaxJitterMs));
                        await Task.Delay(wait, token);
                    }

                    resp.EnsureSuccessStatusCode();

                    var html = await resp.Content.ReadAsStringAsync(token);
                    var batch = await parser.ParseOffers(html, http, token);

                    foreach (var item in batch)
                        results.Add(item);

                    await Task.Delay(rnd.Next(_options.MinJitterMs, _options.MaxJitterMs), token);
                }
                catch (TaskCanceledException) when (!token.IsCancellationRequested)
                {
                    await Task.Delay(
                        TimeSpan.FromMilliseconds(rnd.Next(_options.MinJitterMs, _options.MaxJitterMs)),
                        token);
                }
                catch (HttpRequestException)
                {
                    await Task.Delay(
                        TimeSpan.FromMilliseconds(rnd.Next(_options.MinJitterMs, _options.MaxJitterMs)),
                        token);
                }
        });

        var distinctResults = results
            .GroupBy(x => x.Url, StringComparer.OrdinalIgnoreCase)
            .Select(g => g.First())
            .ToList();

        return distinctResults;
    }

    public async Task<int> DetectTotalPagesAsync(string baseUrl, CancellationToken ct)
    {
        var http = httpFactory.CreateClient("scraper");
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