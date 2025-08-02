using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RealEstateAnalyzer.Domain.Enums;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Infrastructure.Configurations.Converters;

public static class ValueObjectConverters
{
    public static readonly ValueConverter<PricePerSquareMeter, decimal> PricePerSquareMeterConverter =
        new(
            v => v.Price,
            d => new PricePerSquareMeter(d));

    public static readonly ValueConverter<Money, decimal> MoneyConverter =
        new(
            m => m.Amount,
            a => new Money(a));

    public static readonly ValueConverter<Area, decimal> AreaConverter =
        new(
            a => a.SquareMeters,
            s => new Area(s));

    public static readonly ValueConverter<ListingUrl, string> ListingUrlConverter =
        new(
            u => u.Url,
            s => new ListingUrl(s));

    public static readonly ValueConverter<ListingStatus, string> ListingStatusConverter =
        new(
            s => s.ToString(),
            s => Enum.Parse<ListingStatus>(s));

    public static readonly ValueConverter<PropertyType, string> PropertyTypeConverter =
        new(
            p => p.ToString(),
            s => Enum.Parse<PropertyType>(s));

    public static readonly ValueConverter<MarketType, string> MarketTypeConverter =
        new(
            m => m.ToString(),
            s => Enum.Parse<MarketType>(s));

    public static readonly ValueConverter<Volume, uint> VolumeConverter =
        new(
            v => v.Count,
            c => new Volume(c));
}