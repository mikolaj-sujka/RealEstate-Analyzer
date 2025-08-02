using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace RealEstateAnalyzer.Infrastructure.Redis.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        var redisSection = configuration.GetSection("Redis");
        var redisConfig = redisSection.Get<RedisConfiguration>();

        if (redisConfig?.Enabled is false or null)
        {
            return;
        }

        services.Configure<RedisConfiguration>(options => redisSection.Bind(options));

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisConfig.ConnectionString;
            if (!string.IsNullOrWhiteSpace(redisConfig.InstanceName))
                options.InstanceName = redisConfig.InstanceName;
        });

        services.AddSingleton<IConnectionMultiplexer>(sp =>
        {
            var opts = ConfigurationOptions.Parse(redisConfig.ConnectionString, ignoreUnknown: false);
            opts.AbortOnConnectFail = false;
            return ConnectionMultiplexer.Connect(opts);
        });
    }
}

public sealed class RedisConfiguration
{
    public string ConnectionString { get; set; } = null!;
    public bool Enabled { get; set; } = true;
    public string InstanceName { get; set; } = null!;
}
