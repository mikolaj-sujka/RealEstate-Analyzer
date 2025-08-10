using HtmlAgilityPack;
using System.Globalization;
using System.Net;
using System.Text.RegularExpressions;

namespace RealEstateAnalyzer.WebScraping.Helpers;

public static class WebScrapingParserHelpers
{
    public static string ExtractOfferIdFromUrl(string url)
    {
        var m = Regex.Match(url, @"ID([A-Za-z0-9]+)$", RegexOptions.IgnoreCase);
        return m.Success ? $"ID{m.Groups[1].Value}" : string.Empty;
    }

    public static string? ExtractUrl(HtmlNode offer)
    {
        var links = offer.SelectNodes(".//a[@href]");
        if (links is null) return null;

        foreach (var a in links)
        {
            var href = a.GetAttributeValue("href", null!);
            if (string.IsNullOrWhiteSpace(href)) continue;
            if (href.StartsWith("http", StringComparison.OrdinalIgnoreCase) ||
                href.Contains("/pl/oferta", StringComparison.OrdinalIgnoreCase))
                return NormalizeUrl(href);
        }

        return NormalizeUrl(links.FirstOrDefault()?.GetAttributeValue("href", null!));
    }

    public static string NormalizeUrl(string? href) =>
        string.IsNullOrWhiteSpace(href)
            ? ""
            : (href.StartsWith("http", StringComparison.OrdinalIgnoreCase) ? href : $"https://www.otodom.pl{href}");

    public static string? ExtractTitle(HtmlNode offer)
    {
        var links = offer.SelectNodes(".//a[@href]");
        foreach (var a in links)
        {
            var t = CleanTitle(a.InnerText);
            if (!string.IsNullOrWhiteSpace(t) && t.Length > 10 && !LooksLikePriceOrArea(t))
                return t;
        }

        return null;
    }

    public static string TryGuessTitle(string text)
    {
        var t = Regex.Replace(text, @"\d+\s*zł.*", "", RegexOptions.IgnoreCase);
        t = Regex.Replace(t, @"\d+(?:[.,]\d+)?\s*m².*", "", RegexOptions.IgnoreCase);
        t = Condense(t);
        return t.Length > 80 ? t[..80] : t;
    }

    public static (string City, string District) ExtractLocation(HtmlNode offer, string offerText)
    {
        var major = new[]
        {
                "warszawa", "kraków", "łódź", "wrocław", "poznań", "gdańsk", "szczecin", "bydgoszcz", "lublin",
                "katowice",
                "białystok", "gdynia", "częstochowa", "radom", "sosnowiec", "toruń", "kielce", "gliwice", "zabrze",
                "olsztyn",
                "rzeszów", "bielsko-biała", "bytom", "ruda śląska", "rybnik", "opole", "tychy", "gorzów wielkopolski", "płock", "elbląg",
                "wałbrzych", "włocławek", "tarnów", "chorzów", "koszalin", "dąbrowa górnicza", "zielona góra"
            };

        var addr = offer.SelectNodes(
            ".//*[" +
            "contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'location') or " +
            "contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'address') or " +
            "contains(@data-cy,'location')]");
        if (addr != null)
        {
            foreach (var n in addr)
            {
                var t = Condense(n.InnerText);
                if (major.Any(m => t.Contains(m, StringComparison.OrdinalIgnoreCase)))
                {
                    var parts = t.Split(',',
                        StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                    for (int i = 0; i < parts.Length; i++)
                    {
                        var hit = major.FirstOrDefault(
                            m => parts[i].Contains(m, StringComparison.OrdinalIgnoreCase));
                        if (hit != null)
                        {
                            var city = ToTitle(parts[i]);
                            var district = i > 0 ? ToTitle(parts[i - 1]) : "";
                            return (city, district);
                        }
                    }
                }
            }
        }

        var lower = offerText.ToLowerInvariant();
        foreach (var m in major)
        {
            var idx = lower.IndexOf(m, StringComparison.Ordinal);
            if (idx >= 0)
            {
                var city = ToTitle(m);
                var before = offerText.Substring(Math.Max(0, idx - 50), Math.Min(50, idx));
                var mm = Regex.Match(before, @"([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s-]+),\s*$");
                var district = mm.Success ? ToTitle(mm.Groups[1].Value) : "";
                return (city, district);
            }
        }

        return ("", "");
    }

    public static DateTime? ExtractPublishedUtc(HtmlNode offer, string offerText)
    {
        var t = offer.SelectSingleNode(".//time[@datetime]");
        if (t != null)
        {
            var val = t.GetAttributeValue("datetime", null!);
            if (TryParseDate(val, out var d)) return d;
        }

        var m = Regex.Match(offerText, @"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)");
        if (m.Success && TryParseDate(m.Groups[1].Value, out var iso)) return iso;

        m = Regex.Match(offerText, @"(\d{2}\.\d{2}\.\d{4})");
        if (m.Success && TryParseDate(m.Groups[1].Value, out var pl)) return pl;

        return null;
    }

    public static decimal ExtractPricePln(string text)
    {
        var m = Regex.Match(text, @"(\d{1,3}(?:[\s\.]\d{3})*(?:,\d{2})?)\s*zł", RegexOptions.IgnoreCase);
        if (!m.Success) return 0m;
        var raw = m.Groups[1].Value.Replace(" ", "").Replace(".", "").Replace(",", ".");
        return decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var v) ? v : 0m;
    }

    public static decimal ExtractAreaSqm(string text)
    {
        var m = Regex.Match(text, @"(\d+(?:[.,]\d+)?)\s*m²", RegexOptions.IgnoreCase);
        if (!m.Success) return 0m;
        var raw = m.Groups[1].Value.Replace(",", ".");
        return decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var sqm) ? sqm : 0m;
    }

    public static string GuessPropertyType(string title, string text)
    {
        var t = (title + " " + text).ToLowerInvariant();
        if (t.Contains("mieszkan")) return "Apartment";
        if (t.Contains("dom ")) return "House";
        if (t.Contains("działk") || t.Contains("dzialk") || t.Contains("grunt")) return "Land";
        if (t.Contains("lokal") || t.Contains("magazyn") || t.Contains("hala")) return "Industrial";
        return "Other";
    }

    public static string ExtractMarketType(HtmlNode offer)
    {
        var allNodes = offer.SelectNodes(".//*");
        if (allNodes != null)
        {
            foreach (var node in allNodes)
            {
                var text = Condense(node.InnerText).ToLowerInvariant();
                if (string.IsNullOrEmpty(text)) continue;

                var inline = Regex.Match(text, @"rynek\s*[:\-–]\s*(wt[oó]rny|pierwotny)\b");
                if (inline.Success)
                {
                    return inline.Groups[1].Value.StartsWith("wt") ? "SecondaryMarket" : "PrimaryMarket";
                }

                if (text.Contains("rynek"))
                {
                    HtmlNode? neighbor =
                        node.SelectSingleNode("./following-sibling::dd[1]") ??
                        node.SelectSingleNode("./following-sibling::*[1]") ??
                        node.ParentNode?.SelectSingleNode("./dd[1]") ??
                        node.ParentNode?.SelectSingleNode("./following-sibling::*[1]");

                    if (neighbor != null)
                    {
                        var val = Condense(neighbor.InnerText).ToLowerInvariant();
                        if (Regex.IsMatch(val, @"\bwt[oó]rny\b")) return "SecondaryMarket";
                        if (Regex.IsMatch(val, @"\bpierwotny\b")) return "PrimaryMarket";
                    }
                }
            }
        }

        var all = Condense(offer.InnerText).ToLowerInvariant();
        var around = Regex.Match(all, @"rynek.{0,40}(wt[oó]rny|pierwotny)");
        if (around.Success)
            return around.Groups[1].Value.StartsWith("wt") ? "SecondaryMarket" : "PrimaryMarket";

        return "PrimaryMarket";
    }

    public static string Condense(string s) =>
        Regex.Replace(WebUtility.HtmlDecode(s ?? string.Empty), @"\s+", " ").Trim();

    public static string CleanTitle(string s)
    {
        var t = WebUtility.HtmlDecode(s ?? string.Empty);
        t = Regex.Replace(t, @"\d+\s*zł.*", "", RegexOptions.IgnoreCase);
        t = Regex.Replace(t, @"\d+(?:[.,]\d+)?\s*m².*", "", RegexOptions.IgnoreCase);
        t = Regex.Replace(t, @"Liczba pokoi.*", "", RegexOptions.IgnoreCase);
        return Condense(t);
    }

    public static bool LooksLikePriceOrArea(string s) =>
        Regex.IsMatch(s, @"\d+\s*zł", RegexOptions.IgnoreCase) ||
        Regex.IsMatch(s, @"\d+(?:[.,]\d+)?\s*m²", RegexOptions.IgnoreCase);

    public static bool TryParseDate(string? s, out DateTime dt)
    {
        dt = default;
        if (string.IsNullOrWhiteSpace(s)) return false;
        var formats = new[]
        {
                "yyyy-MM-dd'T'HH:mm:ss'Z'", "yyyy-MM-dd'T'HH:mm:ss.fff'Z'",
                "yyyy-MM-dd", "dd.MM.yyyy", "dd.MM.yyyy HH:mm", "dd-MM-yyyy", "dd-MM-yyyy HH:mm"
            };
        return DateTime.TryParseExact(s, formats, CultureInfo.InvariantCulture,
                   DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out dt)
               || DateTime.TryParse(s, CultureInfo.GetCultureInfo("pl-PL"),
                   DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out dt);
    }

    public static string ToTitle(string s) =>
        CultureInfo.GetCultureInfo("pl-PL").TextInfo.ToTitleCase(s?.ToLowerInvariant() ?? "");
}