namespace RealEstateAnalyzer.WebScraping.Domain;

public class OtodomOfferRecord
{
    public string OfferId { get; private set; }
    public string Url { get; private set; }
    public string City { get; private set; }
    public string District { get; private set; }
    public DateTime DatePublished { get; private set; }
    public DateTime DateWebScraped { get; private set; }
    public decimal TotalPrice { get; private set; }
    public decimal FlatSize { get; private set; }
    public decimal PricePerSquareMeter { get; private set; }
    public string Title { get; private set; }
    public string PropertyType { get; private set; }
    public string MarketType { get; private set; }
    public string Status { get; private set; }
    public bool IsDeveloperOffer { get; private set;  }
    public uint BuildingBuiltYear { get; private set; }
    public string Voivodeship { get; private set; }

    public OtodomOfferRecord(
        string offerId,
        string url,
        string city,
        string district,
        DateTime datePublished,
        DateTime dateWebScraped,
        decimal totalPrice,
        decimal flatSize,
        string title,
        string propertyType,
        string marketType,
        string status,
        bool isDeveloperOffer,
        uint buildingBuiltYear,
        string voivodeship)
    {
        var pricePerSquareMeter = (flatSize > 0 ? Math.Round(totalPrice / flatSize, 2) : 0m);

        OfferId = offerId;
        Url = url;
        City = city;
        District = district;
        DatePublished = datePublished;
        DateWebScraped = dateWebScraped;
        TotalPrice = totalPrice;
        FlatSize = flatSize;
        PricePerSquareMeter = pricePerSquareMeter;
        Title = title;
        PropertyType = propertyType;
        MarketType = marketType;
        Status = status;
        IsDeveloperOffer = isDeveloperOffer;
        BuildingBuiltYear = buildingBuiltYear;
        Voivodeship = voivodeship;
    }
}