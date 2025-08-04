using Microsoft.Extensions.Diagnostics.HealthChecks;
using SqlAlias;

namespace RealEstateAnalyzer.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);

        services.AddHealthChecks()
            .AddSqlServer(
                connectionString,
                name: "sqlserver",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "ready", "live" });



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

