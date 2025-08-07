using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace RealEstateAnalyzer.Infrastructure.Redis.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<RedisConfiguration>(options => 
            configuration.GetSection("Redis").Bind(options));

        services.AddSingleton(sp =>
        {
            var redisConfig = sp.GetRequiredService<IOptions<RedisConfiguration>>().Value;
            if (!redisConfig.Enabled)
                return null!; // caller must guard or use TryAdd if you prefer

            var opts = ConfigurationOptions.Parse(redisConfig.ConnectionString, ignoreUnknown: false);
            opts.AbortOnConnectFail = false;
            opts.ClientName = redisConfig.InstanceName;
            opts.ConnectTimeout = 10_000;  // 10 s
            opts.SyncTimeout = 10_000;  // 10 s

            return ConnectionMultiplexer.Connect(opts);
        });

        services.AddScoped(sp =>
        {
            var mux = sp.GetRequiredService<ConnectionMultiplexer>();
            return mux.GetDatabase();
        });

        services.AddStackExchangeRedisCache(options =>
        {
            var redisConfig = configuration.GetSection("Redis").Get<RedisConfiguration>()!;
            options.Configuration = redisConfig.ConnectionString + ",abortConnect=false";
            options.InstanceName = redisConfig.InstanceName;
        });
    }

}

public sealed class RedisConfiguration
{
    public string ConnectionString { get; set; } = null!;
    public bool Enabled { get; set; } = true;
    public string InstanceName { get; set; } = null!;
}
