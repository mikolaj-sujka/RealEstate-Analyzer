using Hangfire;
using Hangfire.Dashboard;

namespace RealEstateAnalyzer.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    public static void MapHangfire(this IApplicationBuilder application, IConfiguration configuration,
        string configurationKey = "Hangfire")
    {
        var mappedConfiguration = configuration.GetSection(configurationKey).Get<HangfireConfiguration>();

        if (mappedConfiguration?.Enabled is false or null)
        {
            return;
        }

        application.UseHangfireDashboard("/hangfire", new DashboardOptions
        {
            Authorization = new[] { new MyAuthorizationFilter() }
        });
    }
}

public class MyAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        var httpContext = context.GetHttpContext();
        return httpContext.User.Identity is { IsAuthenticated: true };
    }
}