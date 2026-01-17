namespace RealEstateAnalyzer.Api.Extensions
{
    public static class HostEnvironmentExtensions
    {
        public static bool IsIntegrationTests(this IHostEnvironment hostEnvironment)
        {
            return hostEnvironment.EnvironmentName.Equals("IntegrationTests");
        }
    }
}
