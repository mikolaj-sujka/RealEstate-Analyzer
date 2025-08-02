using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class GusHousingListing : AuditableAggregateRoot
{
    public Guid CityId { get; private set; }
    public string CityName { get; private set; } = null!;
    public QuarterPeriod Period { get; private set; } = null!;

    public PricePerSquareMeter MedianPricePerSqm { get; private set; } = null!;
    public PricePerSquareMeter AveragePricePerSqm { get; private set; } = null!;

    public Volume FlatsCompleted { get; private set; } = null!;
    public Volume ConstructionStarts { get; private set; } = null!;
    public Area AverageFlatSize { get; private set; } = null!;     
    public Money TotalValueSold { get; private set; } = null!;

    private GusHousingListing() { }

    private GusHousingListing(
        Guid cityId,
        string cityName,
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume constructionStarts,
        Area averageFlatSize,
        Money totalValueSold)
    {
        Id = Guid.NewGuid();
        Created("System", DateTimeOffset.Now);

        CityId = cityId;
        CityName = cityName;
        Period = period;
        MedianPricePerSqm = medianPricePerSqm;
        AveragePricePerSqm = averagePricePerSqm;
        FlatsCompleted = flatsCompleted;
        ConstructionStarts = constructionStarts;
        AverageFlatSize = averageFlatSize;
        TotalValueSold = totalValueSold;
    }

    public static GusHousingListing Create(
        Guid cityId,
        string cityName,
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume constructionStarts,
        Area averageFlatSize,
        Money totalValueSold)
    {
        return new GusHousingListing(
            cityId,
            cityName,
            period,
            medianPricePerSqm,
            averagePricePerSqm,
            flatsCompleted,
            constructionStarts,
            averageFlatSize,
            totalValueSold);
    }

    public void Update(
        QuarterPeriod period,
        PricePerSquareMeter medianPricePerSqm,
        PricePerSquareMeter averagePricePerSqm,
        Volume flatsCompleted,
        Volume constructionStarts,
        Area averageFlatSize,
        Money totalValueSold)
    {
        Period = period;
        MedianPricePerSqm = medianPricePerSqm;
        AveragePricePerSqm = averagePricePerSqm;
        FlatsCompleted = flatsCompleted;
        ConstructionStarts = constructionStarts;
        AverageFlatSize = averageFlatSize;
        TotalValueSold = totalValueSold;

        Updated("System", DateTimeOffset.Now);
    }
}