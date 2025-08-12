using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Polly;

namespace RealEstateAnalyzer.Infrastructure.Http.Extensions;
public class HttpRetryPolicyExtensions(ILogger<HttpRetryPolicyExtensions> logger, IConfiguration configuration)
{
    public IAsyncPolicy<HttpResponseMessage> GetHttpRetryPolicyAsync()
    {
        var numberOfRetries = configuration.GetValue("Scraper:RetryCount", 3);
        {
            return
                Policy
                    .HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
                    .FallbackAsync((_) =>
                    {
                        logger.LogCritical("HTTP request failed after maximum retry attempts.");
                        throw new System.Exception("HTTP request failed after maximum retry attempts.");
                    })
                    .WrapAsync(
                        Policy.HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
                            .WaitAndRetryAsync(numberOfRetries, retryAttempt =>
                                    TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                                (result, timeSpan, retryCount, context) =>
                                {
                                    logger.LogError($"HTTP Retry {retryCount}/{numberOfRetries} after {timeSpan}. Status: {result.Result?.StatusCode}");
                                })
                    );
        }
    }
}