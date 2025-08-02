using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class OtodomHousingListing : AuditableAggregateRoot
{
    public ListingUrl Url { get; private set; } = null!;
    public Location Location { get; private set; } = null!;
    public DateTime DatePublished { get; private set; } 
    public DateTime DateWebScraped { get; private set; } 
    public Money TotalPrice { get; private set; } = null!;
    public Area FlatSize { get; private set; } = null!;
    public PricePerSquareMeter PricePerSqm { get; private set; } = null!;
    public string Title { get; private set; } = null!;
    public PropertyType PropertyType { get; private set; } = PropertyType.Apartment;
    public MarketType MarketType { get; private set; } = MarketType.PrimaryMarket;
    public ListingStatus Status { get; private set; } = ListingStatus.Active;

    private OtodomHousingListing() { }

    private OtodomHousingListing(
        ListingUrl url,
        Location location,
        DateTime datePublished,
        DateTime dateWebScraped,
        Money totalPrice,
        Area flatSize,
        PricePerSquareMeter pricePerSqm,
        string title,
        PropertyType propertyType,
        MarketType marketType,
        ListingStatus status)
    {
        Id = Guid.NewGuid();
        Created("System", DateTimeOffset.Now);

        Url = url;
        Location = location;
        DatePublished = datePublished;
        DateWebScraped = dateWebScraped;
        TotalPrice = totalPrice;
        FlatSize = flatSize;
        PricePerSqm = pricePerSqm;
        Title = title;
        PropertyType = propertyType;
        MarketType = marketType;
        Status = status;
    }

    public static OtodomHousingListing Create(
        ListingUrl url,
        Location location,
        DateTime datePublished,
        DateTime dateWebScraped,
        Money totalPrice,
        Area flatSize,
        PricePerSquareMeter pricePerSqm,
        string title,
        PropertyType propertyType = PropertyType.Apartment,
        MarketType marketType = MarketType.PrimaryMarket,
        ListingStatus status = ListingStatus.Active)
    {
        return new OtodomHousingListing(
            url,
            location,
            datePublished,
            dateWebScraped,
            totalPrice,
            flatSize,
            pricePerSqm,
            title,
            propertyType,
            marketType,
            status);
    }

    public void Update(
        ListingUrl url,
        Location location,
        DateTime datePublished,
        DateTime dateWebScraped,
        Money totalPrice,
        Area flatSize,
        PricePerSquareMeter pricePerSqm,
        string title,
        PropertyType propertyType = PropertyType.Apartment,
        MarketType marketType = MarketType.PrimaryMarket,
        ListingStatus status = ListingStatus.Active)
    {
        Url = url;
        Location = location;
        DatePublished = datePublished;
        DateWebScraped = dateWebScraped;
        TotalPrice = totalPrice;
        FlatSize = flatSize;
        PricePerSqm = pricePerSqm;
        Title = title;
        PropertyType = propertyType;
        MarketType = marketType;
        Status = status;

        Updated("System", DateTimeOffset.Now);
    }
}