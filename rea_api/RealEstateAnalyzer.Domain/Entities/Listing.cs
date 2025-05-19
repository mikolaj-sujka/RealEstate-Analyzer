using RealEstateAnalyzer.Domain.DomainEvents.Listing;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class Listing : AuditableAggregateRoot
{
    public string Title { get; private set; } = null!;
    public Uri Url { get; private set; } = null!;
    public Money Price { get; private set; } = null!;
    public decimal AreaM2 { get; private set; }
    public uint Rooms { get; private set; }
    public uint Floor { get; private set;  }
    public Location Location { get; private set; } = null!;
    public IList<ListingImage> Images { get; } = null!;
    public MarketType MarketType { get; private set; }

    private Listing() {}

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

        Images = new List<ListingImage>();

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

    public void AddImage(ListingImage listingImage)
    {
        Images.Add(listingImage);
    }

    public void RemoveImage(Guid listingImageId)
    {
        Images.Remove(Images.FirstOrDefault(x => x.Id == listingImageId) 
                      ?? throw new ArgumentNullException(nameof(listingImageId)));
        
        AddDomainEvent(new ListingChanged(Id));
    }

    public void Remove()
    {
        AddDomainEvent(new ListingDeleted(Id));
    }

    public void ClearImages()
    {
        Images.Clear();
        AddDomainEvent(new ListingChanged(Id));
    }
}

public sealed class ListingImage : Entity
{
    public Guid ListingId { get; private set; }
    public Uri ImageUrl { get; private set; }

    private ListingImage(Guid listingId, Uri imageUrl)
    {
        Id = Guid.NewGuid();
        ListingId = listingId;
        ImageUrl = imageUrl;
    }

    public static ListingImage Create(Guid listingId, Uri image)
    {
        return new ListingImage(listingId, image);
    }

    public void Update(Uri imageUrl)
    {
        ImageUrl = imageUrl;
    }
}