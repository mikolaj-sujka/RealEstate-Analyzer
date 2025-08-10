namespace RealEstateAnalyzer.Domain.Enums;

public enum MarketType
{
    SecondaryMarket = 0,
    PrimaryMarket = 1,
    Unknown = 2
}

public static class MarketTypeExtensions
{
    public static MarketType FromString(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "SecondaryMarket" => MarketType.SecondaryMarket,
            "PrimaryMarket" => MarketType.PrimaryMarket,
            _ => MarketType.Unknown
        };
    }
}