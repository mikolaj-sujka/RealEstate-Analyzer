using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using RealEstateAnalyzer.WebScraping.Parsing;
using RealEstateAnalyzer.WebScraping.Scraper;
using RealEstateAnalyzer.WebScrapping;

namespace RealEstateAnalyzer.WebScraping.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddWebScrapingServices(this IServiceCollection services, IConfiguration configuration)
    {
        var options = configuration.GetSection("Scraper").Get<ScraperOptions>();
        var retryPolicy = HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(r => r.StatusCode == HttpStatusCode.RequestTimeout)
            .Or<HttpRequestException>()
            .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));

        services.AddHttpClient("otodom", client =>
        {
            client.Timeout = TimeSpan.FromSeconds(30);
            client.DefaultRequestHeaders.UserAgent.ParseAdd(options!.UserAgent);
            client.DefaultRequestHeaders.AcceptLanguage.ParseAdd("pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7");
            client.DefaultRequestHeaders.Accept.ParseAdd("text/html,application/xhtml+xml,application/xml");
        });

        services.AddTransient<IScraper<OtodomOfferRecord>, OtodomScraper>();
        services.AddTransient<IOfferParser<OtodomOfferRecord>, OtodomOfferParser>();
    }
}