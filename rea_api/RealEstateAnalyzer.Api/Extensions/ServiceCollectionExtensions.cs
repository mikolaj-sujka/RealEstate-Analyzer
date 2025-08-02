using Microsoft.Extensions.Diagnostics.HealthChecks;
using SqlAlias;

namespace RealEstateAnalyzer.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);
        var redisConnectionString = Aliases.Map(configuration.GetSection("Redis")["ConnectionString"]);

        services.AddHealthChecks()
            .AddSqlServer(
                connectionString,
                name: "sqlserver",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "ready", "live" })
            .AddRedis(
                redisConnectionString!,
                name: "redis",
                failureStatus: HealthStatus.Degraded, 
                tags: new[] { "ready", "live" },
                timeout: TimeSpan.FromSeconds(5));

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

