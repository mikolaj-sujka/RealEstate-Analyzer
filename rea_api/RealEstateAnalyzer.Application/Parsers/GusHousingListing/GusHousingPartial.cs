using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;

public class GusHousingPartial(string cityCode, string cityName, QuarterPeriod period)
{
    public string CityCode { get; } = cityCode;
    public string CityName { get; } = cityName;
    public QuarterPeriod Period { get; } = period;

    public PricePerSquareMeter? MedianPricePerSqm { get; set; }
    public PricePerSquareMeter? AveragePricePerSqm { get; set; }
    public Volume? FlatsCompleted { get; set; }
    public Money? TotalValueSold { get; set; }
    public Money? AverageTotalPrice { get; set; }
    public Volume? FlatsSold { get; set; }
}