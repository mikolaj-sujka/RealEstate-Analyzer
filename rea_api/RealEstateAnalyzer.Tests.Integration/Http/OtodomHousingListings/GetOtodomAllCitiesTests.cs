using FluentAssertions;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllCities;
using RealEstateAnalyzer.Infrastructure.Tests;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;
using RealEstateAnalyzer.Infrastructure.Tests.Extensions;
using RealEstateAnalyzer.Infrastructure.Tests.TestDataHelpers;

namespace RealEstateAnalyzer.Tests.Integration.Http.OtodomHousingListings
{
    [Collection(DatabaseTestCollection.CollectionName)]
    public class GetOtodomAllCitiesTests : IntegrationTestsBase
    {
            
        [Fact]
        public async Task GetAllCitiesIfExists_ReturnAllCities()
        {
            // Arrange
            Arrange_Database(db =>
            {
                db.Arrange_OtodomHousingListing("Warszawa");
            });

            // Act
            var response = await Client.GetOkResponseAsync<GetOtodomAllCitiesQueryResponse>(ArrangeUrl());

            // Assert
            response.Should().NotBeNull();
            response.Cities.Should().HaveCount(1);
            response.Cities.Should().Contain("Warszawa");
        }

        private static string ArrangeUrl()
        {
            return $"api/v1/OtodomListings/all-cities";
        }
    }
}
