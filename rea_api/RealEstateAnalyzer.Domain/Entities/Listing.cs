using RealEstateAnalyzer.Domain.DomainEvents.Listing;
using RealEstateAnalyzer.Domain.Infrastructure;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Domain.Entities;

public sealed class Listing : AuditableAggregateRoot
{
    public string Title { get; private set; }
    public Uri Url { get; private set; }
    public Money Price { get; private set; }
    public decimal AreaM2 { get; private set; }
    public int Rooms { get; private set; }
    public Location Location { get; private set; }

    private readonly List<Uri> _images = new();
    public IReadOnlyCollection<Uri> Images => _images;

    private Listing(string title, Uri url, Money price, decimal areaM2, int rooms, Location location) 
    {
        Id = Guid.NewGuid();
        Title = title;
        Url = url;
        Price = price;
        AreaM2 = areaM2;
        Rooms = rooms;
        Location = location;

        CreatedAt = DateTimeOffset.UtcNow;

        AddDomainEvent(new ListingCreated(Id));
    }

    public static Listing Create(string title, Uri url, Money price, decimal areaM2, int rooms, Location location)
    {
        return new Listing(title, url, price, areaM2, rooms, location);
    }

    public void Update(string title, Uri url, Money price, decimal areaM2, int rooms, Location location)
    {
        Title = title;
        Url = url;
        Price = price;
        AreaM2 = areaM2;
        Rooms = rooms;
        Location = location;

        UpdatedAt = DateTimeOffset.UtcNow;

        AddDomainEvent(new ListingChanged(Id));
    }

    public void AddImage(Uri image)
    {
        _images.Add(image);
    }
}