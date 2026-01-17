using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllCities;
using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.ValueObjects;
using RealEstateAnalyzer.Infrastructure.Tests;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;

namespace RealEstateAnalyzer.Tests.Integration.Http.OtodomHousingListings
{
    [Collection(DatabaseTestCollection.CollectionName)]
    public class GetOtodomAllCitiesTests : IntegrationTestsBase
    {
        [Fact]
        public async Task ReturnsDistinctCitiesOrderedAscending()
        {
            Arrange_Database(db =>
            {
                db.OtodomHousingListings.AddRange(
                    CreateListing("warszawa"),
                    CreateListing("krakow"),
                    CreateListing("warszawa"),
                    CreateListing("gdansk")
                );
            });

            var response = await Act_Send(new GetOtodomAllCitiesQuery());

            Assert.Single(response);
            Assert.Equal(new[] { "gdansk", "krakow", "warszawa" }, response[0].Cities);
        }

        private static OtodomHousingListing CreateListing(string city)
            => OtodomHousingListing.Create(
                url: new ListingUrl("https://example.com/oferta"),
                location: Location.FromStrings(city, district: "d1", voivodeship: "v1"),
                datePublished: DateTime.UtcNow.Date,
                dateWebScraped: DateTime.UtcNow.Date,
                totalPrice: Money.FromDecimal(500_000),
                flatSize: Area.FromDecimal(50),
                pricePerSqm: PricePerSquareMeter.FromDecimal(10_000),
                title: "test",
                buildingBuiltYear: 2020
            );
    }
}
