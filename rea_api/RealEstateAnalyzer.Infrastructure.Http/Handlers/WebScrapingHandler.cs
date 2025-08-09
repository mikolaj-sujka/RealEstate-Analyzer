using Microsoft.Extensions.Options;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

namespace RealEstateAnalyzer.Infrastructure.Http.Handlers;

public sealed class WebScrapingHandler(IOptions<ScraperOptions> options) : DelegatingHandler
{
    readonly ScraperOptions _options = options.Value;
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
    {
        var h = request.Headers;
        if (!h.UserAgent.Any()) h.UserAgent.ParseAdd(_options.UserAgent);
        if (!h.AcceptLanguage.Any()) h.AcceptLanguage.ParseAdd("pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7");
        if (!h.Accept.Any()) h.Accept.ParseAdd("text/html,application/xhtml+xml,application/xml");
        return base.SendAsync(request, ct);
    }
}