using Microsoft.Extensions.Logging;
using Polly;

namespace RealEstateAnalyzer.Infrastructure.Http.Policies;

public class PollyRetryPolicies
{
    public class PollyRetryPolicy
    {
        private static int numberOfRetries = 3;

        public static IAsyncPolicy GetJobRetryPolicy(ILogger logger)
        {
            return Policy
                .Handle<Exception>()
                .FallbackAsync((_) =>
                {
                    throw new Exception("Job failed after maximum retry attempts.");
                })
                .WrapAsync(
                    Policy.Handle<Exception>()
                        .WaitAndRetryAsync(numberOfRetries, retryAttempt =>
                                TimeSpan.FromSeconds(retryAttempt * 2),
                            (exception, timeSpan, retryCount, context) =>
                            {
                                logger.LogInformation($"Job Retry {retryCount}/{numberOfRetries} after {timeSpan}. Error: {exception.Message}");
                            })
                );
        }
    }
}