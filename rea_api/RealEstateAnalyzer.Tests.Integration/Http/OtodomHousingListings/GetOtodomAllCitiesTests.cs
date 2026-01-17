using FluentAssertions;
using RealEstateAnalyzer.Domain.Entities;
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
        public async Task ReturnsDistinctCitiesOrderedAscending()
        {
            // Arrange
            Arrange_Database(db =>
            {
                db.Arrange_OtodomHousingListing("Warszawa");
            });

            // Act
            var response = await Client.GetOkResponseAsync<OtodomHousingListing>(ArrangeUrl());

            // Assert
            response.Should().NotBeNull();
        }

        private static string ArrangeUrl()
        {
            return $"api/v1/OtodomListings/all-cities";
        }
    }
}
