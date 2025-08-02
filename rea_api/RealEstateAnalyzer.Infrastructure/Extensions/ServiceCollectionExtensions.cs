using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SqlAlias;

namespace RealEstateAnalyzer.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDataLayer(this IServiceCollection services, IConfiguration configuration)
    {
        var migrationAssemblyName = typeof(DatabaseContext).GetTypeInfo().Assembly.GetName().Name;
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);
        services.AddDbContext<DatabaseContext>(
            options => options.UseSqlServer(connectionString,
                sqlOptions =>
                {
                    sqlOptions.MigrationsAssembly(migrationAssemblyName);
                }).EnableSensitiveDataLogging()
        );
    }

    public static void ConfigureHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);
        services.AddHealthChecks()
            .AddSqlServer(connectionString, name: "Database", tags: ["ready", "live"]);

        services.AddHealthChecksUI(opt =>
            {
                opt.SetEvaluationTimeInSeconds(10); 
                opt.MaximumHistoryEntriesPerEndpoint(60); 
                opt.SetApiMaxActiveRequests(1); 
                opt.AddHealthCheckEndpoint("feedback api", "/api/health");     

            })
            .AddInMemoryStorage();
    }
}