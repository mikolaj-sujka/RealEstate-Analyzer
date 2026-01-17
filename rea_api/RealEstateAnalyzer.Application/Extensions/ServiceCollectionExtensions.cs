using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.BackgroundJobs.Job;
using RealEstateAnalyzer.Application.Behaviors;
using RealEstateAnalyzer.Application.Parsers.GusHousingListing;
using RealEstateAnalyzer.Application.Services;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsFromCsv;
using RealEstateAnalyzer.Domain.Entities;

namespace RealEstateAnalyzer.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddMediatRConfig(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssembly(typeof(GetGusHousingListingsFromCsvQuery).Assembly));
    }

    public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMediatRConfig();

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddScoped<IFileParser<GusHousingListing>, CsvGusHousingListingParser>();
        services.AddSingleton<IDateTimeProvider, SystemDateTimeProviderService>();
        services.AddScoped<IRedisCacheListingsService, ListingCacheService>();
        services.AddScoped<ISynchronizationJob, SynchronizationJob>();
        services.AddValidatorsFromAssembly(typeof(GetGusHousingListingsFromCsvQuery).Assembly);
    }
}