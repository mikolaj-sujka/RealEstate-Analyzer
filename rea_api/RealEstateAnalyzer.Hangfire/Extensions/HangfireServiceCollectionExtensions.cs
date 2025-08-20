using Hangfire;
using Hangfire.Console.Extensions;
using Hangfire.MissionControl;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealEstateAnalyzer.Application.BackgroundJobs.Missions.CsvParsing;

namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

public static class HangfireServiceCollectionExtensions
{
    public const string Path = "/hangfire";

    public static void AddHangfire(this IServiceCollection services, IConfiguration configuration,
        string configurationKey = "Hangfire")
    {
        var mappedConfiguration = configuration.GetSection(configurationKey).Get<HangfireConfiguration>();

        if (mappedConfiguration?.Enabled is false or null)
        {
            Console.WriteLine("Hangfire cannot be configured. Enabled is false.");
            return;
        }

        services.AddSingleton(mappedConfiguration);
        var connectionString = configuration.GetConnectionString("DefaultConnection")
                               ?? configuration["Database:ConnectionString"]; 

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
                })
                .UseMissionControl(new MissionControlOptions
                    {
                        RequireConfirmation = false,
                        HideCodeSnippet = false
                    },
                    typeof(CsvParsingGusHousingListingBackgroundJobMission).Assembly);
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

        services.Configure<HangfireJobsOptions>(configuration.GetSection("Hangfire"));

        services.AddMvc();
    }

    public static IApplicationBuilder UseHangfireDashboardWithAuth(this IApplicationBuilder app, IConfiguration configuration,
       IWebHostEnvironment environment, string configurationKey = "Hangfire")
    {
        var mappedConfiguration = configuration.GetSection(configurationKey).Get<HangfireConfiguration>();


        if (mappedConfiguration is { Enabled: true })
        {
            app.UseHangfireDashboard(Path, new DashboardOptions
            {
                Authorization = new[]
                {
                    new HangfireBasicAuthorizationFilter(
                        user: mappedConfiguration.User ?? "admin",
                        pass: mappedConfiguration.Password ?? "admin",
                        requiresSsl: environment.IsProduction(),
                        honorForwardedProto: true)
                } 
            });
        }

        return app;
    }
}