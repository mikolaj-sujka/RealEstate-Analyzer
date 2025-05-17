using RealEstateAnalyzer.Domain.DomainEvents.Listing;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class Listing : AuditableAggregateRoot
{
    public string Title { get; private set; }
    public Uri Url { get; private set; }
    public Money Price { get; private set; }
    public decimal AreaM2 { get; private set; }
    public uint Rooms { get; private set; }
    public uint Floor { get; private set;  }
    public Location Location { get; private set; }

    private readonly List<Uri> _images = new();
    public IReadOnlyCollection<Uri> Images => _images;
    public MarketType MarketType { get; private set; }

    private Listing(string title, Uri url, decimal areaM2, uint rooms, uint floor, decimal amount, string currency,
        string city, string district, string street, string postalCode, decimal? latitude, decimal? longitude, 
        MarketType marketType)
    {
        Id = Guid.NewGuid();
        Title = title;
        Url = url;
        AreaM2 = areaM2;
        Rooms = rooms;
        Floor = floor;
        Price = new Money(amount, currency);
        Location = new Location(city, district, street, postalCode, latitude, longitude);
        MarketType = marketType;

        CreatedAt = DateTimeOffset.UtcNow;

        AddDomainEvent(new ListingCreated(Id));
    }

    public static Listing Create(string title, Uri url, decimal areaM2, uint rooms, uint floor, decimal amount, string currency,
        string city, string district, string street, string postalCode, decimal? latitude, decimal? longitude, MarketType marketType)
    {
        return new Listing(title, url, areaM2, rooms, floor, amount, currency, city, district, street, postalCode,
            latitude, longitude, marketType);
    }

    public void Update(string title, Uri url, decimal areaM2, uint rooms, uint floor, decimal amount, string currency,
        string city, string district, string street, string postalCode, decimal? latitude, decimal? longitude, MarketType marketType)
    {
        Title = title;
        Url = url;
        Floor = floor;
        AreaM2 = areaM2;
        Rooms = rooms;
        Price = new Money(amount, currency);
        Location = new Location(city, district, street, postalCode, latitude, longitude);
        MarketType = marketType;

        UpdatedAt = DateTimeOffset.UtcNow;

        AddDomainEvent(new ListingChanged(Id));
    }

    public void AddImage(Uri image)
    {
        _images.Add(image);
    }

    public void RemoveImage(Uri image)
    {
        _images.Remove(image);

        AddDomainEvent(new ListingChanged(Id));
    }

    public void Remove()
    {
        AddDomainEvent(new ListingDeleted(Id));
    }

    public void ClearImages()
    {
        _images.Clear();
        AddDomainEvent(new ListingChanged(Id));
    }
}