using CsvHelper;
using System.Globalization;
using System.Text.RegularExpressions;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;

internal static class CsvParsingGusHousingListingHelpers
{
    private static readonly Regex QuarterRegex = new(@"\b(\d+)\s*kwart", RegexOptions.IgnoreCase);
    private static readonly Regex YearRegex = new(@"\b(20\d{2}|19\d{2})\b", RegexOptions.Compiled);
    public static bool TryExtractYear(string header, out uint year)
    {
        year = 0;
        var m = YearRegex.Match(header);
        return m.Success && uint.TryParse(m.Groups[1].Value, out year);
    }

    public static bool TryExtractQuarter(string header, out uint quarter)
    {
        quarter = 0;
        var m = QuarterRegex.Match(header);
        return m.Success && uint.TryParse(m.Groups[1].Value, out quarter);
    }

    public static bool TryGetSpecialQuarterRange(
        string header,

        in IReadOnlyDictionary<string, (uint From, uint To)> map,
        out (uint From, uint To) range)
    {
        var key = map.Keys
            .FirstOrDefault(k => header
                .Contains(k, StringComparison.OrdinalIgnoreCase));
        if (key is null)
        {
            range = default;
            return false;
        }
        range = map[key];
        return true;
    }

    public static bool TryParseDecimal(string raw, out decimal value)
        => decimal.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out value);

    public static bool TryReadKey(CsvReader csv, out CsvParsingGusHousingKey key)
    {
        key = default;
        try
        {
            var code = csv.GetField("Kod");
            var name = csv.GetField("Nazwa");
            key = new CsvParsingGusHousingKey(code!, name!, 0, 0);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
