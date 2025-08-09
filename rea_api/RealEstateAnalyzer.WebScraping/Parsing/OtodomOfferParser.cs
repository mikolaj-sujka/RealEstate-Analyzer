using HtmlAgilityPack;
using RealEstateAnalyzer.WebScraping.Abstractions;
using RealEstateAnalyzer.WebScraping.Domain;
using RealEstateAnalyzer.WebScraping.Helpers;

namespace RealEstateAnalyzer.WebScraping.Parsing;

public sealed class OtodomOfferParser : IOfferParser<OtodomOfferRecord>
{
    public IReadOnlyList<OtodomOfferRecord> ParseOffers(string htmlContent)
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

            var offerId = WebScrapingParserHelpers.ExtractOfferIdFromUrl(url);

            var title = WebScrapingParserHelpers.ExtractTitle(n) ?? WebScrapingParserHelpers.TryGuessTitle(text);

            var (city, district) = WebScrapingParserHelpers.ExtractLocation(n, text);

            var publishedUtc = WebScrapingParserHelpers.ExtractPublishedUtc(n, text) ?? DateTime.UtcNow;
            var scrapedUtc = DateTime.UtcNow;

            var price = WebScrapingParserHelpers.ExtractPricePln(text);
            var size = WebScrapingParserHelpers.ExtractAreaSqm(text);

            var propertyType = WebScrapingParserHelpers.GuessPropertyType(title, text);
            var marketType = WebScrapingParserHelpers.GuessMarketType(text);
            var status = "Active";

            list.Add(new OtodomOfferRecord(
                offerId,
                url, city, district,
                publishedUtc, scrapedUtc,
                price, size, title, propertyType, marketType, status));
        }

        return list;
    }
}