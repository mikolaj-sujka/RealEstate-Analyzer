using Hangfire;
using Hangfire.Console.Extensions;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SqlAlias;

namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

public sealed class HangfireConfiguration
{
    public bool Enabled { get; set; }
    public IDictionary<string, string?>? Crons { get; set; }
    public int LongRunningQueueWorkersCount { get; set; }
}

public static class HangfireServiceCollectionExtensions
{
    public static void AddHangfire(this IServiceCollection services, IConfiguration configuration,
        string configurationKey = "Hangfire")
    {
        var mappedConfiguration = configuration.GetSection(configurationKey).Get<HangfireConfiguration>();

        if (mappedConfiguration?.Enabled is false or null)
        {
            return;
        }

        services.AddSingleton(mappedConfiguration);
        var connectionString = Aliases.Map(configuration.GetSection("Database")["ConnectionString"]);

        services.AddHangfire(hangfireConfig =>
        {
            hangfireConfig
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseSqlServerStorage(connectionString, new SqlServerStorageOptions
                {
                    CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
                    SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
                    QueuePollInterval = TimeSpan.FromMinutes(1),
                    UseRecommendedIsolationLevel = true,
                    DisableGlobalLocks = true,
                    EnableHeavyMigrations = true,
                    SchemaName = "hangfire",
                    PrepareSchemaIfNecessary = true
                });
        });

        services.AddHangfireServer(x =>
        {
            x.ServerName = $"{Environment.MachineName}:long-running";
            x.Queues = ["long-running", "import-files"];
            x.WorkerCount = mappedConfiguration.LongRunningQueueWorkersCount;
            x.HeartbeatInterval = TimeSpan.FromMinutes(5);
            x.ServerTimeout = TimeSpan.FromHours(6);
            x.ServerCheckInterval = TimeSpan.FromMinutes(5);
            x.ShutdownTimeout = TimeSpan.FromHours(1);
            x.CancellationCheckInterval = TimeSpan.FromSeconds(30);
        });

        services.AddHangfireConsoleExtensions();

        services.AddHangfireServer();
    }

    public static IApplicationBuilder UseHangfireDashboardWithAuth(this IApplicationBuilder app, IConfiguration configuration)
    {
        app.UseHangfireDashboard("/hangfire", new DashboardOptions
        {
            Authorization = new[] { new HangfireBasicAuthorizationFilter(
                user: configuration["HangfireDashboard:User"] ?? "admin",
                pass: configuration["HangfireDashboard:Password"] ?? "secret",
                requiresSsl: false) } // w prodzie wymuś SSL i silniejsze zabezpieczenie. 
        });

        return app;
    }
}