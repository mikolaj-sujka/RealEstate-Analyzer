using System.Threading.RateLimiting;

namespace RealEstateAnalyzer.Infrastructure.Http.Handlers
{
    public sealed class RequestRateLimiterHandler : DelegatingHandler
    {
        private static readonly RateLimiter Limiter = new TokenBucketRateLimiter(
            new TokenBucketRateLimiterOptions
            {
                TokenLimit = 3,
                TokensPerPeriod = 3,
                ReplenishmentPeriod = TimeSpan.FromSeconds(2),
                QueueLimit = 200,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                AutoReplenishment = true
            });

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            using var lease = await Limiter.AcquireAsync(1, ct);
            if (!lease.IsAcquired) throw new HttpRequestException("Locally rate-limited");

            await Task.Delay(Random.Shared.Next(500, 1500), ct);
            return await base.SendAsync(request, ct);
        }
    }
}