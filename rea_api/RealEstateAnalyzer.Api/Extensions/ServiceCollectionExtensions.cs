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

    public static string ConfigureCors(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection("CorsPolicyName");
        var name = section.GetValue<string>("Name") ?? "DefaultCors";
        var origins = section.GetSection("Origins").Get<string[]>() ?? Array.Empty<string>();
        var methods = section.GetSection("Methods").Get<string[]>() ?? new[] { "GET", "POST" };
        var headers = section.GetSection("Headers").Get<string[]>() ?? new[] { "Content-Type", "Authorization" };
        var allowCreds = section.GetValue<bool>("AllowCredentials");

        services.AddCors(options =>
        {
            options.AddPolicy(name, builder =>
            {
                if (origins.Length > 0)
                    builder.WithOrigins(origins);

                builder.WithMethods(methods)
                    .WithHeaders(headers);

                if (allowCreds)
                    builder.AllowCredentials(); 
            });
        });

        return name;
    }

}

