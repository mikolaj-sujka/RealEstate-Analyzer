using Microsoft.Extensions.Logging;
using Polly;

namespace RealEstateAnalyzer.Infrastructure.Http.Extensions;
public class HttpRetryPolicyExtensions(ILogger<HttpRetryPolicyExtensions> logger)
{
    private const int NumberOfRetries = 3;

    public IAsyncPolicy<HttpResponseMessage> GetHttpRetryPolicyAsync()
    {
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
                            .WaitAndRetryAsync(NumberOfRetries, retryAttempt =>
                                    TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                                (result, timeSpan, retryCount, context) =>
                                {
                                    logger.LogError($"HTTP Retry {retryCount}/{NumberOfRetries} after {timeSpan}. Status: {result.Result?.StatusCode}");
                                })
                    );
        }
    }
}