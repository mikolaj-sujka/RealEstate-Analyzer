using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Infrastructure.Configurations;

public class ListingEntityTypeConfiguration : IEntityTypeConfiguration<Listing>
{
    public void Configure(EntityTypeBuilder<Listing> builder)
    {
        builder.ToTable("Listings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedNever().IsRequired();

        builder.Property(x => x.Title).IsRequired().HasMaxLength(255);

        builder.Property(l => l.Url)
            .HasConversion(
                uri => uri.ToString(),
                str => new Uri(str))
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(l => l.MarketType)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(l => l.CreatedAt)
            .IsRequired();
        builder.Property(l => l.UpdatedAt)
            .IsRequired(false);

        builder.Property(x => x.AreaM2).IsRequired();

        builder.Property(x => x.Rooms).IsRequired();

        builder.Property(x => x.Floor).IsRequired();

        builder.OwnsOne<Money>(
            nameof(Listing.Price),
            money =>
            {
                money.Property(m => m.Amount)
                    .HasColumnName("PriceAmount")
                    .IsRequired();
                money.Property(m => m.Currency)
                    .HasColumnName("PriceCurrency")
                    .IsRequired()
                    .HasMaxLength(3);
            });

        builder.OwnsOne<Location>(
            l => l.Location,
            loc =>
            {
                loc.Property(lc => lc.City)
                    .HasColumnName("City")
                    .IsRequired()
                    .HasMaxLength(100);
                loc.Property(lc => lc.District)
                    .HasColumnName("District")
                    .HasMaxLength(100);
                loc.Property(lc => lc.Street)
                    .HasColumnName("Street")
                    .HasMaxLength(200);
                loc.Property(lc => lc.PostalCode)
                    .HasColumnName("PostalCode")
                    .HasMaxLength(20);
                loc.Property(lc => lc.Latitude)
                    .HasColumnName("Latitude");
                loc.Property(lc => lc.Longitude)
                    .HasColumnName("Longitude");
            });

        builder.HasMany(l => l.Images)
            .WithOne()    
            .IsRequired()
            .HasForeignKey(li => li.ListingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}