using HtmlAgilityPack;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using RealEstateAnalyzer.WebScraping.Helpers;

namespace RealEstateAnalyzer.WebScraping.Parsing;

public sealed class OtodomOfferParser : IOfferParser<OtodomOfferRecord>
{
    public async Task<IReadOnlyList<OtodomOfferRecord>> ParseOffers(string htmlContent,
        HttpClient client, CancellationToken ct = default)
    {
        var doc = new HtmlDocument();
        doc.LoadHtml(htmlContent);

        var nodes = doc.DocumentNode.SelectNodes("//article");
        if (nodes.Count == 0) return Array.Empty<OtodomOfferRecord>();

        var list = new List<OtodomOfferRecord>(nodes.Count);

        foreach (var n in nodes)
        {
            var text = WebScrapingParserHelpers.Condense(n.InnerText);

            var url = WebScrapingParserHelpers.ExtractUrl(n);
            if (string.IsNullOrWhiteSpace(url)) continue;

            var title = WebScrapingParserHelpers.ExtractTitle(n) ?? WebScrapingParserHelpers.TryGuessTitle(text);

            var publishedUtc = WebScrapingParserHelpers.ExtractPublishedUtc(n, text) ?? DateTime.UtcNow;
            var scrapedUtc = DateTime.UtcNow;

            var size = WebScrapingParserHelpers.ExtractAreaSqm(text);

            var propertyType = WebScrapingParserHelpers.GuessPropertyType(title, text);

            var (marketType, isDeveloper, buildingBuiltYear,price, pricePerSqm) 
                = await WebScrapingParserHelpers.ExtractDetailsFromOfferUrlAsync(client, url, ct);

            var (city, district, voivodeship) =
                await WebScrapingParserHelpers.ExtractLocationFromOfferPageAsync(client, url, ct);

            if (string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(district))
            {
                // If city or district is not found, skip this offer
                continue;
            }

            var status = "Active";

            if (size <= 0m || price <= 0m)
                continue;

            if (string.IsNullOrWhiteSpace(propertyType))
                continue;

            var year = buildingBuiltYear; 

            if (year == 0)
            {
                continue;
            }

            if (string.IsNullOrEmpty(voivodeship))
            {
                continue;
            }

            list.Add(new OtodomOfferRecord(
                url, city, district,
                publishedUtc, scrapedUtc,
                price, size, title, propertyType, 
                marketType, status, isDeveloper, buildingBuiltYear, voivodeship, pricePerSqm));
        }

        return list;
    }
}