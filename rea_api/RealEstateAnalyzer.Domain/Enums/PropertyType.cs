namespace RealEstateAnalyzer.Domain.Enums;

public enum PropertyType
{
    Apartment = 1,
    House = 2,
    Land = 3,
    Industrial = 4,
    Other = 5
}

public static class PropertyTypeExtensions
{
    public static PropertyType FromString(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "apartment" => PropertyType.Apartment,
            "house" => PropertyType.House,
            "land" => PropertyType.Land,
            "industrial" => PropertyType.Industrial,
            _ => PropertyType.Other
        };
    }
}
