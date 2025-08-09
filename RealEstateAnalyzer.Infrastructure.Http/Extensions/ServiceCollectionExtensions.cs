using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using RealEstateAnalyzer.Infrastructure.Http.Handlers;
using RealEstateAnalyzer.Infrastructure.Http.HttpOptions;

namespace RealEstateAnalyzer.Infrastructure.Http.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddHttpScrapingServices(this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.Configure<ScraperOptions>(configuration.GetSection("Scraper"));

        services.AddTransient<WebScrapingHandler>();

        services.AddHttpClient("otodom", client =>
        {
            client.Timeout = TimeSpan.FromSeconds(30);
        })
            .AddHttpMessageHandler<WebScrapingHandler>()
            .AddPolicyHandler(HttpPolicyExtensions
                .HandleTransientHttpError()                   
                .WaitAndRetryAsync(3, a => TimeSpan.FromSeconds(Math.Pow(2, a))));

    }
}