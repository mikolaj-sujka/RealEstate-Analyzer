namespace RealEstateAnalyzer.Domain.Enums;

public enum ListingStatus
{
    Active = 1,
    Inactive = 2,
    Sold = 3,
    Pending = 4,
    Archived = 5,
    Unknown = 6
}

public static class ListingStatusExtensions
{
    public static ListingStatus FromString(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "active" => ListingStatus.Active,
            "inactive" => ListingStatus.Inactive,
            "sold" => ListingStatus.Sold,
            "pending" => ListingStatus.Pending,
            "archived" => ListingStatus.Archived,
            _ => ListingStatus.Unknown
        };
    }
}