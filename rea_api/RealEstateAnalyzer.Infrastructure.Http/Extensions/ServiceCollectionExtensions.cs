using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Polly;
using Polly.Extensions.Http;
using RealEstateAnalyzer.Infrastructure.Http.Handlers;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;
using System.Net;

namespace RealEstateAnalyzer.Infrastructure.Http.Extensions;

public static class ServiceCollectionExtensions
{

    public static void AddHttpScrapingServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ScraperOptions>(configuration.GetSection("Scraper"));
        services.AddTransient<WebScrapingHandler>();
        services.AddTransient<RequestRateLimiterHandler>();

        var handled = new[] { HttpStatusCode.Forbidden, (HttpStatusCode)429, HttpStatusCode.ServiceUnavailable };

        IAsyncPolicy<HttpResponseMessage> retry = HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(r => handled.Contains(r.StatusCode))
            .WaitAndRetryAsync(5, i =>
                TimeSpan.FromMilliseconds(300 * Math.Pow(2, i)) +
                TimeSpan.FromMilliseconds(Random.Shared.Next(0, 300)));

        IAsyncPolicy<HttpResponseMessage> breaker = HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(r => handled.Contains(r.StatusCode))
            .CircuitBreakerAsync(5, TimeSpan.FromMinutes(45));

        services.AddHttpClient("scraper", (sp, client) =>
        {
            client.Timeout = TimeSpan.FromSeconds(30);
        })
            .AddHttpMessageHandler<RequestRateLimiterHandler>()
            .AddHttpMessageHandler<WebScrapingHandler>()
            .AddPolicyHandler(Policy.WrapAsync(retry, breaker))
            .ConfigurePrimaryHttpMessageHandler(sp =>
            {
                var opts = sp.GetRequiredService<IOptions<ScraperOptions>>().Value;

                var handler = new SocketsHttpHandler
                {
                    UseCookies = true,
                    CookieContainer = new CookieContainer(),
                    AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli,
                    AllowAutoRedirect = true,
                    EnableMultipleHttp2Connections = true,

                    MaxConnectionsPerServer = 2,
                    PooledConnectionIdleTimeout = TimeSpan.FromMinutes(30),
                    PooledConnectionLifetime = TimeSpan.FromMinutes(30),
                };

                if (!string.IsNullOrWhiteSpace(opts.ProxyUrl))
                {
                    handler.Proxy = new WebProxy(opts.ProxyUrl);
                    handler.UseProxy = true;
                }

                return handler;
            });
    }

    public static async Task<string> GetStringWithRefererAsync(
        this HttpClient http, string url, string? referer = null, CancellationToken ct = default)
    {
        using var req = new HttpRequestMessage(HttpMethod.Get, url);
        if (!string.IsNullOrWhiteSpace(referer))
            req.Headers.Referrer = new Uri(referer);

        using var resp = await http.SendAsync(req, HttpCompletionOption.ResponseHeadersRead, ct);
        resp.EnsureSuccessStatusCode();
        return await resp.Content.ReadAsStringAsync(ct);
    }

}