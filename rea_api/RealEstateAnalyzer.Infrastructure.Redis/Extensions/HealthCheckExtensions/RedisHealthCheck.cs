using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace RealEstateAnalyzer.Infrastructure.Redis.Extensions.HealthCheckExtensions;

using StackExchange.Redis;

public class RedisHealthCheck(string connectionString) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var options = ConfigurationOptions.Parse(connectionString);
            options.AbortOnConnectFail = false;

            await using var mux = await ConnectionMultiplexer.ConnectAsync(options);
            var db = mux.GetDatabase();

            var pingTask = db.PingAsync();
            var completed = await Task.WhenAny(pingTask, Task.Delay(TimeSpan.FromSeconds(5), cancellationToken));
            if (completed != pingTask)
                return HealthCheckResult.Unhealthy("Redis ping timeout.");

            var latency = await pingTask; // TimeSpan
            return HealthCheckResult.Healthy($"PONG {latency.TotalMilliseconds}ms");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Redis unreachable.", ex);
        }
    }
}