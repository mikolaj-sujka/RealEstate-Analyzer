namespace RealEstateAnalyzer.Domain.Enums;

public enum MarketType
{
    SecondaryMarket = 0,
    PrimaryMarket = 1,
}

public static class MarketTypeExtensions
{
    public static MarketType FromString(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "secondary" => MarketType.SecondaryMarket,
            "primary" => MarketType.PrimaryMarket,
            _ => throw new ArgumentException($"Unknown market type: {value}")
        };
    }
}