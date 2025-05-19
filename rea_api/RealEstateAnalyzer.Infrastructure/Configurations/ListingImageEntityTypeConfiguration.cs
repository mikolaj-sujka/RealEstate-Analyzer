using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Entities;

namespace RealEstateAnalyzer.Infrastructure.Configurations;

public class ListingImageEntityTypeConfiguration : IEntityTypeConfiguration<ListingImage>
{
    public void Configure(EntityTypeBuilder<ListingImage> builder)
    {
        builder.ToTable("ListingImages");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        
        builder.Property(x => x.ImageUrl)
            .HasConversion(
                uri => uri.ToString(),
                str => new Uri(str))
            .IsRequired()
            .HasMaxLength(1000);

        builder.HasOne<Listing>()
            .WithMany(l => l.Images)
            .HasForeignKey(li => li.ListingId)
            .IsRequired();
    }
}