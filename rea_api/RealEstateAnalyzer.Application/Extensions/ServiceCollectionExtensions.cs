using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.Parsers.GusHousingListing;
using RealEstateAnalyzer.Application.UseCases.GetGusHousingListingsFromCsv;
using RealEstateAnalyzer.Domain.Entities;

namespace RealEstateAnalyzer.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddMediatRConfig(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssembly(typeof(GetGusHousingListingsFromCsvQuery).Assembly));
    }

    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatRConfig();
        services.AddScoped<IFileParser<GusHousingListing>, CsvGusHousingListingParser>();
    }
}