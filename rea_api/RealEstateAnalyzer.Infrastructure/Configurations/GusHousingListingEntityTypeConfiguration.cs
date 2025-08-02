using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Infrastructure.Configurations.Extensions;

namespace RealEstateAnalyzer.Infrastructure.Configurations;

public class GusHousingListingEntityTypeConfiguration : IEntityTypeConfiguration<GusHousingListing>
{
    public void Configure(EntityTypeBuilder<GusHousingListing> builder)
    {
        builder.ToTable("GusHousingListings");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .ValueGeneratedNever().IsRequired();

        builder.Property(x => x.CityId).IsRequired();

        builder.Property(x => x.CityName).IsRequired().HasMaxLength(100);

        builder.OwnsOne(h => h.Period, p =>
        {
            p.Property(x => x.Year).HasColumnName("PeriodYear").IsRequired();
            p.Property(x => x.Quarter).HasColumnName("PeriodQuarter").IsRequired();
        });

        builder.Property(x => x.MedianPricePerSqm)
            .HasPricePerSquareMeterConversion()
            .IsRequired();

        builder.Property(x => x.AveragePricePerSqm)
            .HasPricePerSquareMeterConversion()
            .IsRequired();

        builder.Property(x => x.FlatsCompleted)
            .HasVolumeConversion()
            .IsRequired();

        builder.Property(x => x.ConstructionStarts)
            .HasVolumeConversion()
            .IsRequired();

        builder.Property(x => x.AverageFlatSize)
            .HasAreaConversion()
            .IsRequired();

        builder.Property(x => x.TotalValueSold)
            .HasMoneyConversion()
            .IsRequired();
    }
}