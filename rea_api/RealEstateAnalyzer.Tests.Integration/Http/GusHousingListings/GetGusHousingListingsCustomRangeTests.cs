using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsCustomRange;
using RealEstateAnalyzer.Infrastructure.Tests;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;
using RealEstateAnalyzer.Infrastructure.Tests.Extensions;
using RealEstateAnalyzer.Infrastructure.Tests.TestDataHelpers;
using FluentAssertions;

namespace RealEstateAnalyzer.Tests.Integration.Http.GusHousingListings
{
    [Collection(DatabaseTestCollection.CollectionName)]
    public class GetGusHousingListingsCustomRangeTests : IntegrationTestsBase
    {
        [Fact]
        public async Task GivenData_WhenRangeMatches_ReturnsFilteredAndSorted()
        {
            // Arrange
            Arrange_Database(db =>
            {
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2019, quarter: 4); // out
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2020, quarter: 1); // in
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2020, quarter: 4); // in
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2021, quarter: 2); // in
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2021, quarter: 3); // out
                db.Arrange_GusHousingListing(cityName: "krakow", cityCode: "KRK", year: 2020, quarter: 1);
            });

            // Act
            var url = ArrangeUrlWithQueryParams(
                cityName: "warszawa",
                yearsFrom: 2020,
                yearsTo: 2021,
                monthFrom: 2,
                monthTo: 5);

            var response = await Client.GetOkResponseAsync<GetGusHousingListingsCustomRangeQueryResponse>(url);

            // Assert
            response.Should().NotBeNull();
            response.Listings.Should().HaveCount(3);

            response.Listings[0].Year.Should().Be(2021);
            response.Listings[0].Quarter.Should().Be(2);

            response.Listings[1].Year.Should().Be(2020);
            response.Listings[1].Quarter.Should().Be(4);

            response.Listings[2].Year.Should().Be(2020);
            response.Listings[2].Quarter.Should().Be(1);

            response.Listings.Should().OnlyContain(x => x.CityCode == "WAW");
        }

        [Fact]
        public async Task GivenInvalidCityName_WhenContainsDigits_ReturnsBadRequest()
        {
            // Arrange
            Arrange_Database(db =>
            {
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2020, quarter: 1);
            });

            // Act
            var url = ArrangeUrlWithQueryParams(
                cityName: "War5zawa",
                yearsFrom: 2020,
                yearsTo: 2021,
                monthFrom: 1,
                monthTo: 12);

            // Assert
            await Client.GetBadRequestAsync(url);

        }

        [Fact]
        public async Task GivenInvalidMonths_WhenOutOfRange_ReturnsBadRequest()
        {
            // Arrange
            Arrange_Database(db =>
            {
                db.Arrange_GusHousingListing(cityName: "warszawa", cityCode: "WAW", year: 2020, quarter: 1);
            });

            // Act
            var url = ArrangeUrlWithQueryParams(
                cityName: "warszawa",
                yearsFrom: 2020,
                yearsTo: 2021,
                monthFrom: 0,
                monthTo: 13);


            // Assert
            await Client.GetBadRequestAsync(url);
        }

        private static string ArrangeUrl() => "api/v1/GusListings/date-range";

        private static string ArrangeUrlWithQueryParams(
            string cityName,
            uint yearsFrom,
            uint yearsTo,
            uint monthFrom,
            uint monthTo)
        {
            return $"{ArrangeUrl()}?cityName={Uri.EscapeDataString(cityName)}&yearsFrom={yearsFrom}&yearsTo={yearsTo}&monthFrom={monthFrom}&monthTo={monthTo}";
        }
    }
}
