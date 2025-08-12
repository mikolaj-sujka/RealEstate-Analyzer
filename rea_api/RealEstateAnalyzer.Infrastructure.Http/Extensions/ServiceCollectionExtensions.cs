using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Infrastructure.Http.Handlers;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

namespace RealEstateAnalyzer.Infrastructure.Http.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddHttpScrapingServices(this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.Configure<ScraperOptions>(configuration.GetSection("Scraper"));

        services.AddSingleton<HttpRetryPolicyExtensions>();

        services.AddTransient<WebScrapingHandler>();

        services.AddTransient<RequestRateLimiterHandler>();

        services.AddHttpClient("otodom", client =>
            {
                client.Timeout = TimeSpan.FromSeconds(30);
            })
            .AddHttpMessageHandler<RequestRateLimiterHandler>()
            .AddHttpMessageHandler<WebScrapingHandler>()
            .AddPolicyHandler((sp, _) =>

                sp.GetRequiredService<HttpRetryPolicyExtensions>()
                    .GetHttpRetryPolicyAsync()
            ).ConfigurePrimaryHttpMessageHandler(sp =>
            {
                var cookies = new CookieContainer();
                return new SocketsHttpHandler
                {
                    UseCookies = true,
                    CookieContainer = cookies,

                    AutomaticDecompression = DecompressionMethods.GZip |
                                         DecompressionMethods.Deflate |
                                         DecompressionMethods.Brotli,

                    AllowAutoRedirect = true,
                    EnableMultipleHttp2Connections = true,

                    PooledConnectionIdleTimeout = TimeSpan.FromMinutes(60),
                    PooledConnectionLifetime = TimeSpan.FromMinutes(60),

                    MaxConnectionsPerServer = 6
            };
    });
    }
}