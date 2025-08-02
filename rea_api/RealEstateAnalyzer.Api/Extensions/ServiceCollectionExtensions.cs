using Hangfire;
using Hangfire.Common;
using Hangfire.MissionControl;
using Hangfire.SqlServer;
using Hangfire.States;
using Hangfire.Console.Extensions;
using Hangfire.Storage;
using RealEstateAnalyzer.Api.Services;
using RealEstateAnalyzer.Application.BackgroundJobs;
using SqlAlias;

namespace RealEstateAnalyzer.Api.Extensions;

public static class ServiceCollectionExtensions
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
                })
                .UseMissionControl(new MissionControlOptions
                {
                    RequireConfirmation = false,
                    HideCodeSnippet = false
                },
                typeof(OtodomWebScrappingBackgroundJobMission).Assembly)
                .UseFilter(new JobExpirationTimeAttribute());
        });

        services.AddHangfireServer(x =>
        {
            x.ServerName = $"{Environment.MachineName}:long-running";
            x.Queues = ["long-running"];
            x.WorkerCount = mappedConfiguration.LongRunningQueueWorkersCount;
        });

        services.AddHangfireConsoleExtensions();

        services.AddHangfireServer();
        // services.AddHostedService<HangfireRecurringJobConfiguratorHostedService>();
    }

    public static void AddHangfireAuthorizationWithPolicies(this IServiceCollection services)
    {

        services.AddAuthorization(options =>
        {
            options.AddPolicy(PolicyDefinitions.HangfireDashboard, policyBuilder =>
            {
                policyBuilder.AddAuthenticationSchemes("OpenIdConnect");
                policyBuilder.RequireAuthenticatedUser();
                policyBuilder.RequireAssertion(x => true);
            });
        });
    }

    public static void AddMediatR(this IServiceCollection services)
    {
        // services.AddMediatR(configuration => configuration.RegisterServicesFromAssemblies(typeof(GetListingsByStatusQuery).Assembly));
    }
}

public class JobExpirationTimeAttribute : JobFilterAttribute, IApplyStateFilter
{
    public void OnStateApplied(ApplyStateContext context, IWriteOnlyTransaction transaction)
    {
        context.JobExpirationTimeout = TimeSpan.FromDays(60);
    }

    public void OnStateUnapplied(ApplyStateContext context, IWriteOnlyTransaction transaction)
    {
    }
}

public static class PolicyDefinitions
{
    public const string HangfireDashboard = nameof(HangfireDashboard);
}

public class HangfireConfiguration
{
    public bool Enabled { get; set; }
    public IDictionary<string, string?>? Crons { get; set; }
    public int LongRunningQueueWorkersCount { get; set; }
}