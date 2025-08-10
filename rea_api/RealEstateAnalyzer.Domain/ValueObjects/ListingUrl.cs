using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;

public sealed class ListingUrl : ValueObject
{
    public string Url { get; }

    public ListingUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url)) throw new ArgumentException("URL required");
        Url = url;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Url;
    }

    public static ListingUrl FromString(string url) => new ListingUrl(url);
}