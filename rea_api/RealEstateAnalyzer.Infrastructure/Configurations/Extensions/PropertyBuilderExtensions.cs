using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.ValueObjects;
using RealEstateAnalyzer.Infrastructure.Configurations.Converters;

namespace RealEstateAnalyzer.Infrastructure.Configurations.Extensions;

public static class PropertyBuilderExtensions
{
    public static PropertyBuilder<PricePerSquareMeter> HasPricePerSquareMeterConversion(this PropertyBuilder<PricePerSquareMeter> builder)
    {
        return builder.HasConversion(ValueObjectConverters.PricePerSquareMeterConverter);
    }

    public static PropertyBuilder<Money> HasMoneyConversion(this PropertyBuilder<Money> builder)
    {
        return builder.HasConversion(ValueObjectConverters.MoneyConverter);
    }

    public static PropertyBuilder<Area> HasAreaConversion(this PropertyBuilder<Area> builder)
    {
        return builder.HasConversion(ValueObjectConverters.AreaConverter);
    }

    public static PropertyBuilder<ListingUrl> HasListingUrlConversion(this PropertyBuilder<ListingUrl> builder)
    {
        return builder.HasConversion(ValueObjectConverters.ListingUrlConverter);
    }

    public static PropertyBuilder<ListingStatus> HasListingStatusConversion(this PropertyBuilder<ListingStatus> builder)
    {
        return builder.HasConversion(ValueObjectConverters.ListingStatusConverter);
    }

    public static PropertyBuilder<PropertyType> HasPropertyTypeConversion(this PropertyBuilder<PropertyType> builder)
    {
        return builder.HasConversion(ValueObjectConverters.PropertyTypeConverter);
    }

    public static PropertyBuilder<MarketType> HasMarketTypeConversion(this PropertyBuilder<MarketType> builder)
    {
        return builder.HasConversion(ValueObjectConverters.MarketTypeConverter);
    }

    public static PropertyBuilder<Volume> HasVolumeConversion(this PropertyBuilder<Volume> builder)
    {
        return builder.HasConversion(ValueObjectConverters.VolumeConverter);
    }
}