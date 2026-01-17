using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Infrastructure.Tests.TestDataHelpers
{
    public static partial class DbContextHelper
    {
        public static OtodomHousingListing Arrange_OtodomHousingListing(
            this DatabaseContext db,
            string city
        )
        {
            var otodomHousing = OtodomHousingListing.Create(
                url: new ListingUrl("https://example.com/oferta"),
                location: Location.FromStrings(city, district: "d1", voivodeship: "v1"),
                datePublished: DateTime.UtcNow.Date,
                dateWebScraped: DateTime.UtcNow.Date,
                totalPrice: Money.FromDecimal(500_000),
                flatSize: Area.FromDecimal(50),
                pricePerSqm: PricePerSquareMeter.FromDecimal(10_000),
                title: "test",
                buildingBuiltYear: 2020);

            db.Add(otodomHousing);
            return otodomHousing;
        }
    }
}
