using HtmlAgilityPack;
using System.Globalization;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using RealEstateAnalyzer.Domain.Enums;

namespace RealEstateAnalyzer.WebScraping.Helpers;

public static class WebScrapingParserHelpers
{
    public static async Task<(MarketType MarketType, bool IsDeveloper, uint buildingBuiltYear, decimal price, 
            decimal pricePerSqm)> 
        ExtractDetailsFromOfferUrlAsync(HttpClient http, string url, CancellationToken ct = default)
    {
        var html = await http.GetStringAsync(url, ct);
        var doc = new HtmlDocument();
        doc.LoadHtml(html);

        var root = doc.DocumentNode;

        var marketRaw = ExtractDetailValue(root, "rynek"); 
        var marketType = MapMarketType(marketRaw);

        var advTypeRaw = ExtractDetailValue(root, "typ ogłoszeniodawcy");
        bool isDeveloper = false;
        if (!string.IsNullOrWhiteSpace(advTypeRaw))
        {
            var v = Normalize(advTypeRaw);
            if (v.Contains("deweloper")) isDeveloper = true;
            else isDeveloper = false; 
        }

        var buildingYearRaw = ExtractDetailValue(root, "rok budowy");

        uint buildingBuiltYear = 0;
        if (!string.IsNullOrWhiteSpace(buildingYearRaw))
        {
            var yearStr = Regex.Match(buildingYearRaw, @"\d{4}").Value;
            if (uint.TryParse(yearStr, out var year) && year > 1900 && year <= (uint)DateTime.UtcNow.Year)
            {
                buildingBuiltYear = year;
            }
        }

        var (price, pricePerSqm) = ExtractPriceData(root);

        return (marketType, isDeveloper, buildingBuiltYear, price, pricePerSqm);
    }

    private static (decimal Price, decimal PricePerSqm) ExtractPriceData(HtmlNode root)
    {
        decimal price = 0m, pricePerSqm = 0m;

        var priceSection = root.SelectSingleNode("//div[@data-sentry-element='PriceSection']") ?? root;

        var priceNode = priceSection.SelectSingleNode(
            ".//strong[@aria-label='Cena' or @data-cy='adPageHeaderPrice' or @data-sentry-element='Price']"
        );

        if (priceNode != null)
        {
            price = ParsePln(priceNode.InnerText);
        }

        if (price == 0m)
        {
            var sectionText = NormalizeSpaces(priceSection.InnerText);
            var matches = Regex.Matches(sectionText, @"(\d[\d\s.,]*)\s*zł\b(?!\s*/\s*m)", RegexOptions.IgnoreCase);
            if (matches.Count > 0)
            {
                var numeric = matches[^1].Groups[1].Value;
                price = ParsePln(numeric);
            }
        }

        var pricePerSqmNode = priceSection.SelectSingleNode(
            ".//*[@aria-label='Cena za metr kwadratowy']"
        );

        if (pricePerSqmNode != null)
        {
            pricePerSqm = ParsePln(pricePerSqmNode.InnerText);
        }

        if (pricePerSqm == 0m)
        {
            var sectionText = NormalizeSpaces(priceSection.InnerText);
            var m2 = Regex.Matches(sectionText, @"(\d[\d\s.,]*)\s*zł\s*/\s*m(?:2|²)\b", RegexOptions.IgnoreCase);
            if (m2.Count > 0)
            {
                var numeric = m2[^1].Groups[1].Value;
                pricePerSqm = ParsePln(numeric);
            }
        }

        return (price, pricePerSqm);
    }

    private static decimal ParsePln(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return 0m;

        var s = HtmlEntity.DeEntitize(raw);
        s = s.Replace("\u00A0", " ");     // NBSP
        s = Regex.Replace(s, @"\s+", " "); // sklej spacje

        s = Regex.Replace(s, @"zł.*$", "", RegexOptions.IgnoreCase).Trim();

        s = Regex.Replace(s, @"[^0-9,.\s]", "");
        s = s.Replace(" ", "");

        if (s.Contains(',') && s.Contains('.'))
        {
            s = s.Replace(".", "");
            s = s.Replace(",", ".");
        }
        else
        {
            if (s.Contains(',') && !s.Contains('.'))
                s = s.Replace(",", ".");
            else if (s.Contains('.') && !s.Contains(','))
                s = s.Replace(".", "");
        }

        return decimal.TryParse(s, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var val)
            ? val
            : 0m;
    }
    private static string NormalizeSpaces(string s)
    {
        var t = HtmlEntity.DeEntitize(s).Replace("\u00A0", " ");
        return Regex.Replace(t, @"\s+", " ").Trim();
    }


    private static string? ExtractDetailValue(HtmlNode root, string labelNormalized)
    {
        var containers = root.SelectNodes("//div[@data-sentry-element='ItemGridContainer']");
        
        if (containers.Count == 0)
            return null;

        foreach (var c in containers)
        {
            var label = Normalize(c.InnerText);
            if (label.Contains(labelNormalized))
                return Condense(c.InnerText);
        }
        return null;
    }

    private static MarketType MapMarketType(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return MarketType.Unknown;
        var v = Normalize(raw);
        if (v.Contains("wtorny") || v.Contains("wtórny")) return MarketType.SecondaryMarket;
        if (v.Contains("pierwotny")) return MarketType.PrimaryMarket;
        return MarketType.Unknown;
    }

    private static string Normalize(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return string.Empty;
        var lower = Condense(s).ToLowerInvariant();
        return RemoveDiacritics(lower);
    }

    private static string RemoveDiacritics(string text)
    {
        var normalized = text.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(text.Length);
        foreach (var ch in normalized)
        {
            var cat = CharUnicodeInfo.GetUnicodeCategory(ch);
            if (cat != UnicodeCategory.NonSpacingMark) sb.Append(ch);
        }
        return sb.ToString().Normalize(NormalizationForm.FormC);
    }

    public static string? ExtractUrl(HtmlNode offer)
    {
        var a = offer.SelectSingleNode(
            ".//a[contains(@href, '/pl/oferta/') and contains(@href, 'ID') and " +
            "not(contains(@href, '/hpr/')) and not(contains(@href, 'undefined'))]"
        );

        if (a is null) return null;

        var href = WebUtility.HtmlDecode(a.GetAttributeValue("href", null!));
        if (string.IsNullOrWhiteSpace(href)) return null;

        if (href.Contains("/hpr/", StringComparison.OrdinalIgnoreCase) ||
            href.Contains("undefined", StringComparison.OrdinalIgnoreCase))
            return null;

        if (!href.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            href = $"https://www.otodom.pl{href}";

        try
        {
            var u = new Uri(href);
            href = $"{u.Scheme}://{u.Host}{u.AbsolutePath}";
        }
        catch
        {
            // ignored
        }

        if (!Regex.IsMatch(href, @"/pl/oferta/.+ID[a-zA-Z0-9]+$", RegexOptions.IgnoreCase))
            return null;

        return href;
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

    public static (string City, string District, string Voivodeship) ExtractLocation(HtmlNode offer, string offerText)
    {
        var major = new[]
        {
        "warszawa","kraków","łódź","wrocław","poznań","gdańsk","szczecin","bydgoszcz","lublin",
        "katowice","białystok","gdynia","częstochowa","radom","sosnowiec","toruń","kielce","gliwice","zabrze",
        "olsztyn","rzeszów","bielsko-biała","bytom","ruda śląska","rybnik","opole","tychy","gorzów wielkopolski","płock","elbląg",
        "wałbrzych","włocławek","tarnów","chorzów","koszalin","dąbrowa górnicza","zielona góra"
    };

        var voivodeships = new[]
        {
        "dolnośląskie","kujawsko-pomorskie","lubelskie","lubuskie","łódzkie","małopolskie","mazowieckie","opolskie",
        "podkarpackie","podlaskie","pomorskie","śląskie","świętokrzyskie","warmińsko-mazurskie","wielkopolskie","zachodniopomorskie"
    };

        string city = "", district = "", voiv = "";

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

                if (string.IsNullOrEmpty(city) && major.Any(m => t.Contains(m, StringComparison.OrdinalIgnoreCase)))
                {
                    var parts = t.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                    for (int i = 0; i < parts.Length; i++)
                    {
                        var hit = major.FirstOrDefault(m => parts[i].Contains(m, StringComparison.OrdinalIgnoreCase));
                        if (hit != null)
                        {
                            city = ToTitle(parts[i]);
                            district = i > 0 ? ToTitle(parts[i - 1]) : district;
                            break;
                        }
                    }
                }

                if (string.IsNullOrEmpty(voiv))
                {
                    var vh = voivodeships.FirstOrDefault(v => t.Contains(v, StringComparison.OrdinalIgnoreCase));
                    if (vh != null) voiv = ToTitle(vh);
                }

                if (!string.IsNullOrEmpty(city) && !string.IsNullOrEmpty(voiv))
                    break;
            }
        }

        var lower = offerText.ToLowerInvariant();

        if (string.IsNullOrEmpty(city))
        {
            foreach (var m in major)
            {
                var idx = lower.IndexOf(m, StringComparison.Ordinal);
                if (idx >= 0)
                {
                    city = ToTitle(m);
                    var before = offerText.Substring(Math.Max(0, idx - 50), Math.Min(50, idx));
                    var mm = Regex.Match(before, @"([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż\s-]+),\s*$");
                    if (mm.Success) district = ToTitle(mm.Groups[1].Value);
                    break;
                }
            }
        }

        if (string.IsNullOrEmpty(voiv))
        {
            foreach (var v in voivodeships)
            {
                if (lower.Contains(v, StringComparison.Ordinal))
                {
                    voiv = ToTitle(v);
                    break;
                }
            }
        }

        return (city, district, voiv);
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