using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Infrastructure;
using StackExchange.Redis;

namespace RealEstateAnalyzer.Application.Services;

public class ListingCacheService(DatabaseContext databaseContext, IDatabase cacheDatabase,
    ILogger<ListingCacheService> logger) : IRedisCacheListingsService
{
    public async Task<IDictionary<string, IReadOnlyList<GusHousingListingData>>> 
        GetGusHousingListingsByCity(string cityName)
    {
        try
        {
            var cachedListings = cacheDatabase.StringGet(cityName);

            if (cachedListings.HasValue)
            {
                var listings = JsonSerializer.Deserialize<IDictionary<string,
                    IReadOnlyList<GusHousingListingData>>>(cachedListings!);
                return (await Task.FromResult(listings)!)!;
            }

            var listingsFromDb = databaseContext.GusHousingListings
                .Where(l => l.CityName.Contains(cityName.ToLower()))
                .Select(l => new GusHousingListingData(
                    l.Period,
                    l.MedianPricePerSqm,
                    l.AveragePricePerSqm,
                    l.FlatsCompleted,
                    l.FlatsSold,
                    l.TotalValueSold,
                    l.AverageTotalPrice))
                .AsNoTracking()
                .ToList();

            var listingsDict = new Dictionary<string, IReadOnlyList<GusHousingListingData>>
                {
                { cityName, listingsFromDb }
            };

            var serializedListings = JsonSerializer.Serialize(listingsDict);
            cacheDatabase.StringSet(cityName, serializedListings, TimeSpan.FromDays(1));

            return listingsDict;

        }
        catch (RedisException e)
        {
            logger.LogError(e, "Error retrieving listings from Redis cache for city " +
                               "{CityName}", cityName);

            // Fallback to database if cache retrieval fails
            var listingsFromDb = databaseContext.GusHousingListings
                .Where(l => l.CityName.Contains(cityName.ToLower()))
                .Select(l => new GusHousingListingData(
                    l.Period,
                    l.MedianPricePerSqm,
                    l.AveragePricePerSqm,
                    l.FlatsCompleted,
                    l.FlatsSold,
                    l.TotalValueSold,
                    l.AverageTotalPrice))
                .AsNoTracking()
                .ToList();

            var listingsDict = new Dictionary<string, IReadOnlyList<GusHousingListingData>>
            {
                { cityName, listingsFromDb }
            };

            // Cache the listings from the database
            var serializedListings = JsonSerializer.Serialize(listingsDict);
            cacheDatabase.StringSet(cityName, serializedListings, TimeSpan.FromDays(1));

            return listingsDict;
        }
    }

    public Task<IReadOnlyList<string>> GetGusHousingListingsAllCities()
    {
        try
        {
            var cachedListings = cacheDatabase.StringGet("all_cities_gus_v2");
            if (cachedListings.HasValue)
            {
                var listings = JsonSerializer.Deserialize<IReadOnlyList<string>>(cachedListings!);
                return Task.FromResult(listings!);
            }
            var listingsFromDb = databaseContext.GusHousingListings
                .Select(l => l.CityName)
                .Distinct()
                .AsNoTracking()
                .OrderBy(x => x)
                .ToList();

            var serializedListings = JsonSerializer.Serialize(listingsFromDb);
            cacheDatabase.StringSet("all_cities_gus_v2", serializedListings, TimeSpan.FromDays(1));
            return Task.FromResult((IReadOnlyList<string>)listingsFromDb);
        }
        catch (RedisException e)
        {
            logger.LogError(e, "Error retrieving all cities listings from Redis cache.");
            var listingsFromDb = databaseContext.GusHousingListings
                .Select(l => l.CityName)
                .AsNoTracking()
                .Distinct()
                .OrderBy(x => x)
                .ToList();
            var serializedListings = JsonSerializer.Serialize(listingsFromDb);
            cacheDatabase.StringSet("all_cities_gus_v2", serializedListings, TimeSpan.FromDays(1));
            return Task.FromResult((IReadOnlyList<string>)listingsFromDb);
        }
    }
}