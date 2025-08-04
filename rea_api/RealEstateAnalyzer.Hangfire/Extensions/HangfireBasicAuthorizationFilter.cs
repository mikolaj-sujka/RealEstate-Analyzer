using System.Text;
using Hangfire.Dashboard;

namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;
public class HangfireBasicAuthorizationFilter(string user, string pass, bool requiresSsl = true)
    : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        var http = context.GetHttpContext();

        if (requiresSsl && !http.Request.IsHttps)
            return false;

        string authHeader = http.Request.Headers["Authorization"]!;
        if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Basic "))
            return Challenge(http);

        var encoded = authHeader["Basic ".Length..].Trim();
        string decoded;
        try
        {
            decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
        }
        catch
        {
            return Challenge(http);
        }

        var parts = decoded.Split(':', 2);
        if (parts.Length != 2) return Challenge(http);

        var (user1, pass1) = (parts[0], parts[1]);
        if (user1 == user && pass1 == pass) return true;

        return Challenge(http);
    }

    private bool Challenge(Microsoft.AspNetCore.Http.HttpContext http)
    {
        http.Response.Headers["WWW-Authenticate"] = "Basic realm=\"Hangfire Dashboard\"";
        http.Response.StatusCode = 401;
        return false;
    }
}
