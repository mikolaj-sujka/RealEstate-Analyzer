namespace RealEstateAnalyzer.Application.Extensions;


public static class StatsExtensions
{
    public static decimal AverageIgnoreZero(this IEnumerable<decimal> source, decimal @default = 0m)
    {
        if (source is null) return @default;
        var data = source.Where(v => v > 0m).ToArray();
        var dataSum= data.Sum();

        var averageData = data.Length == 0 ? @default : dataSum / data.Length;

        return averageData;
    }

    public static uint AverageYearIgnoreZero(this IEnumerable<int?> years, int minYear = 1800, int? maxYear = null)
    {
        if (years is null) return 0;
        var upper = maxYear ?? DateTime.UtcNow.Year;
        var data = years.Where(y => y.HasValue && y.Value >= minYear && y.Value <= upper).Select(y => y!.Value).ToArray();
        if (data.Length == 0) return 0;
        var avg = data.Average(); // double
        return (uint)Math.Round(avg, MidpointRounding.AwayFromZero);
    }

    public static decimal MedianIgnoreZero(this IEnumerable<decimal> source, decimal @default = 0m) 
    {
        if (source is null) return @default;
        var data = source.Where(v => v > 0m).OrderBy(v => v).ToArray();
        var n = data.Length;
        if (n == 0) return @default;
        if (n % 2 == 1) return data[n / 2];
        return (data[n / 2 - 1] + data[n / 2]) / 2m;
    }
}
