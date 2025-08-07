using Microsoft.Extensions.Diagnostics.HealthChecks;
using SqlAlias;

namespace RealEstateAnalyzer.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);

        var healthCheckBuilder = services.AddHealthChecks()
            .AddSqlServer(
                connectionString,
                name: "sqlserver",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "ready", "live" });

        var redisSection = configuration.GetSection("Redis");
        if (redisSection.GetValue<bool>("Enabled"))
        {
            var rawRedisConn = redisSection.GetValue<string>("ConnectionString");

            var healthRedisConn = $"{rawRedisConn},abortConnect=false";

            healthCheckBuilder.AddRedis(
                healthRedisConn,
                name: "redis",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "ready", "live" }
            );
        }

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

