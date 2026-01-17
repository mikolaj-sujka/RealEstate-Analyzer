using RealEstateAnalyzer.Application.Abstractions;

namespace RealEstateAnalyzer.Infrastructure.Tests.Stubs
{
    public class RedisCacheListingsServiceStub : IRedisCacheListingsService
    {
        private readonly Dictionary<string, IDictionary<string, IReadOnlyList<GusHousingListingData>>> _byCity = new();
        private IReadOnlyList<string> _allCities = Array.Empty<string>();

        public void SeedCity(string city, IDictionary<string, IReadOnlyList<GusHousingListingData>> data) => _byCity[city] = data;
        public void SeedAllCities(IReadOnlyList<string> cities) => _allCities = cities;

        public Task<IDictionary<string, IReadOnlyList<GusHousingListingData>>> GetGusHousingListingsByCity(string cityName)
            => Task.FromResult(_byCity.TryGetValue(cityName, out var d) ? d : new Dictionary<string, IReadOnlyList<GusHousingListingData>>());

        public Task<IReadOnlyList<string>> GetGusHousingListingsAllCities()
            => Task.FromResult(_allCities);
    }
}
