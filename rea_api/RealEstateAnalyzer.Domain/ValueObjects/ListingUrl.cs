using RealEstateAnalyzer.Domain.Infrastructure;
using System.Diagnostics.CodeAnalysis;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class ListingUrl : ValueObject, IEquatable<ListingUrl>
{
    public string Url { get; }
    public ListingUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            throw new ArgumentException("URL required", nameof(url));

        Url = Canonicalize(url);
    }

    public static ListingUrl FromString(string url) => new ListingUrl(url);

    public static string Canonicalize(string input)
    {
        var u = input.Trim();

        var hashIdx = u.IndexOf('#');
        if (hashIdx >= 0) u = u[..hashIdx];

        var qIdx = u.IndexOf('?');
        if (qIdx >= 0) u = u[..qIdx];

        if (u.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
            u = "https://" + u[7..];

        u = u.Replace("://www.otodom.pl/", "://otodom.pl/", StringComparison.OrdinalIgnoreCase);

        if (u.EndsWith("/", StringComparison.Ordinal))
            u = u[..^1];

        u = u.ToLowerInvariant();

        return u;
    }

    #region Equality

    public bool Equals(ListingUrl? other) =>
        other is not null &&
        string.Equals(Url, other.Url, StringComparison.Ordinal);

    public override bool Equals(object? obj) => obj is ListingUrl o && Equals(o);

    public override int GetHashCode() =>
        StringComparer.Ordinal.GetHashCode(Url);

    public static bool operator ==(ListingUrl? left, ListingUrl? right) =>
        Equals(left, right);

    public static bool operator !=(ListingUrl? left, ListingUrl? right) =>
        !Equals(left, right);

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Url; 
    }

    public override string ToString() => Url;

    #endregion

    #region Conversions (opcjonalnie)

    public static implicit operator string(ListingUrl v) => v.Url;

    public static bool TryCreate(string? input, [NotNullWhen(true)] out ListingUrl? value)
    {
        if (string.IsNullOrWhiteSpace(input)) { value = null; return false; }
        value = new ListingUrl(input);
        return true;
    }

    #endregion
}
