using System.Text;
using Hangfire.Dashboard;
using Microsoft.AspNetCore.Http;

namespace RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;

public sealed class HangfireBasicAuthorizationFilter : IDashboardAuthorizationFilter
{
    private readonly string _user;
    private readonly string _pass;
    private readonly bool _requiresSsl;
    private readonly bool _honorForwardedProto;

    public HangfireBasicAuthorizationFilter(
        string user,
        string pass,
        bool requiresSsl = true,
        bool honorForwardedProto = true)
    {
        _user = user ?? throw new ArgumentNullException(nameof(user));
        _pass = pass ?? throw new ArgumentNullException(nameof(pass));
        _requiresSsl = requiresSsl;
        _honorForwardedProto = honorForwardedProto;
    }

    public bool Authorize(DashboardContext context)
    {
        var http = context.GetHttpContext();

        if (_requiresSsl && !IsHttps(http))
            return Challenge(http);

        if (!http.Request.Headers.TryGetValue("Authorization", out var headerValues))
            return Challenge(http);

        var authHeader = headerValues.ToString();
        if (string.IsNullOrWhiteSpace(authHeader) ||
            !authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            return Challenge(http);

        var encoded = authHeader.Substring("Basic ".Length).Trim();

        string decoded;
        try
        {
            decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
        }
        catch
        {
            return Challenge(http);
        }

        var sep = decoded.IndexOf(':');
        if (sep <= 0)
            return Challenge(http);

        var user = decoded.Substring(0, sep);
        var pass = decoded[(sep + 1)..];

        if (string.Equals(user, _user, StringComparison.Ordinal) &&
            string.Equals(pass, _pass, StringComparison.Ordinal))
        {
            return true;
        }

        return Challenge(http);
    }

    private bool IsHttps(HttpContext http)
    {
        if (http.Request.IsHttps) return true;
        if (_honorForwardedProto &&
            string.Equals(http.Request.Headers["X-Forwarded-Proto"], "https", StringComparison.OrdinalIgnoreCase))
            return true;

        return false;
    }

    private static bool Challenge(HttpContext http)
    {
        http.Response.StatusCode = StatusCodes.Status401Unauthorized;
        http.Response.Headers["WWW-Authenticate"] = "Basic realm=\"Hangfire Dashboard\"";
        return false;
    }
}
