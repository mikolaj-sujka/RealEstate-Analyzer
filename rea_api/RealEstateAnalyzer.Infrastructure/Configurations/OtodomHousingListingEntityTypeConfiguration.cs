using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Infrastructure.Configurations.Extensions;

namespace RealEstateAnalyzer.Infrastructure.Configurations;

public class OtodomHousingListingEntityTypeConfiguration : IEntityTypeConfiguration<OtodomHousingListing>
{
    public void Configure(EntityTypeBuilder<OtodomHousingListing> builder)
    {
        builder.ToTable("OtodomHousingListings");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .ValueGeneratedNever().IsRequired();

        builder.Property(x => x.OfferId).IsRequired();

        builder.HasIndex(x => x.OfferId)
            .IsUnique()
            .HasDatabaseName("IX_OtodomHousingListings_OfferId");

        builder.Property(x => x.Url)
            .HasListingUrlConversion()
            .IsRequired();

        builder.OwnsOne(h => h.Location, l =>
        {
            l.Property(x => x.City).HasMaxLength(100).IsRequired();
            l.Property(x => x.District).HasMaxLength(100).IsRequired();
        });

        builder.Property(x => x.DatePublished)
            .IsRequired();

        builder.Property(x => x.DateWebScraped)
            .IsRequired();

        builder.Property(x => x.TotalPrice)
            .HasMoneyConversion()
            .IsRequired();

        builder.Property(x => x.FlatSize)
            .HasAreaConversion()
            .IsRequired();

        builder.Property(x => x.PricePerSqm)
            .HasPricePerSquareMeterConversion()
            .IsRequired();

        builder.Property(x => x.Title)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.PropertyType)
            .HasPropertyTypeConversion()
            .IsRequired();

        builder.Property(x => x.MarketType)
            .HasMarketTypeConversion()
            .IsRequired();

        builder.Property(x => x.Status)
            .HasListingStatusConversion()
            .IsRequired();
    }
}