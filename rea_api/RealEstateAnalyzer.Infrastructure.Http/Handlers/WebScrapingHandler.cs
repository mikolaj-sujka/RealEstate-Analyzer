using Microsoft.Extensions.Options;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;
using System.Net;

namespace RealEstateAnalyzer.Infrastructure.Http.Handlers
{
    public sealed class WebScrapingHandler(IOptions<ScraperOptions> options) : DelegatingHandler
    {
        readonly ScraperOptions _options = options.Value;

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            request.Version = HttpVersion.Version20;
            request.VersionPolicy = HttpVersionPolicy.RequestVersionOrLower;

            var h = request.Headers;

            if (h.Referrer is null && Uri.TryCreate(_options.BaseUrl, UriKind.Absolute, out var refUri))
                h.Referrer = refUri;

            if (!h.UserAgent.Any())
                h.UserAgent.ParseAdd(string.IsNullOrWhiteSpace(_options.UserAgent)
                    ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
                    : _options.UserAgent);

            if (!h.Accept.Any())
                h.TryAddWithoutValidation("Accept",
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");

            if (!h.AcceptLanguage.Any())
                h.AcceptLanguage.ParseAdd("pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7");

            if (!h.AcceptEncoding.Any())
                h.AcceptEncoding.ParseAdd("gzip, deflate, br, zstd");

            h.TryAddWithoutValidation("Upgrade-Insecure-Requests", "1");

            return base.SendAsync(request, ct);
        }
    }
}