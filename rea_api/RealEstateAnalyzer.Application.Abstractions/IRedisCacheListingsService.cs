using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Application.Abstractions;

public record GusHousingListingData(QuarterPeriod Period, PricePerSquareMeter MedianPricePerSquareMeter,
    PricePerSquareMeter AverPricePerSquareMeter, Volume FlatsCompleted, Volume FlatsSold,
    Money TotalValueSold, Money AverageTotalPrice);

public interface IRedisCacheListingsService
{
    Task<IDictionary<string,
        IReadOnlyList<GusHousingListingData>>> GetGusHousingListingsByCity(string cityName);

    Task<IReadOnlyList<string>> GetGusHousingListingsAllCities();
}
