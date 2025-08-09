using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using RealEstateAnalyzer.WebScraping.Parsing;
using RealEstateAnalyzer.WebScraping.Scraper;

namespace RealEstateAnalyzer.WebScraping.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddWebScrapingServices(this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddTransient<IScraper<OtodomOfferRecord>, OtodomScraper>();
        services.AddTransient<IOfferParser<OtodomOfferRecord>, OtodomOfferParser>();
    }
}