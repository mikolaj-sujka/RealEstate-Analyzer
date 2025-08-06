using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class GusHousingListing : AuditableAggregateRoot
{
    public string CityCode { get; private set; } = null!;
    public string CityName { get; private set; } = null!;
    public QuarterPeriod Period { get; private set; } = null!;

    public PricePerSquareMeter MedianPricePerSqm { get; private set; } = null!;
    public PricePerSquareMeter AveragePricePerSqm { get; private set; } = null!;

    public Volume FlatsCompleted { get; private set; } = null!;
    public Volume FlatsSold { get; private set; } = null!;
    public Money TotalValueSold { get; private set; } = null!;
    public Money AverageTotalPrice { get; private set; } = null!;

    private GusHousingListing() { }

    private GusHousingListing(
        string cityCode,
        string cityName,
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume flatsSold,
        Money totalValueSold,
        Money averageTotalPrice)
    {
        Id = Guid.NewGuid();
        Created("System", DateTimeOffset.Now);

        CityCode = cityCode;
        CityName = cityName;
        Period = period;
        MedianPricePerSqm = medianPricePerSqm;
        AveragePricePerSqm = averagePricePerSqm;
        FlatsCompleted = flatsCompleted;
        FlatsSold = flatsSold;
        TotalValueSold = totalValueSold;
        AverageTotalPrice = averageTotalPrice;
    }

    public static GusHousingListing Create(
        string cityCode,
        string cityName,
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume flatsSold,
        Money totalValueSold,
        Money averageTotalPrice)
    {
        return new GusHousingListing(
            cityCode,
            cityName,
            period,
            medianPricePerSqm,
            averagePricePerSqm,
            flatsCompleted,
            flatsSold,
            totalValueSold,
            averageTotalPrice);
    }

    public void Update(
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume flatsSold,
        Money totalValueSold,
        Money averageTotalPrice)
    {
        Period = period;
        MedianPricePerSqm = medianPricePerSqm;
        AveragePricePerSqm = averagePricePerSqm;
        FlatsCompleted = flatsCompleted;
        FlatsSold = flatsSold;
        TotalValueSold = totalValueSold;
        AverageTotalPrice = averageTotalPrice;

        Updated("System", DateTimeOffset.Now);
    }
}