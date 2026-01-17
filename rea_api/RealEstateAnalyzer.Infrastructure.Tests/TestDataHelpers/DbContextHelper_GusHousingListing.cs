using RealEstateAnalyzer.Domain.Entities;
using RealEstateAnalyzer.Domain.ValueObjects;

namespace RealEstateAnalyzer.Infrastructure.Tests.TestDataHelpers
{
    public static partial class DbContextHelper
    {
        public static GusHousingListing Arrange_GusHousingListing(
            this DatabaseContext db,
            string cityName,
            string cityCode,
            uint year,
            uint quarter,
            decimal medianPricePerSqm = 10_000m,
            decimal averagePricePerSqm = 9_500m,
            uint flatsCompleted = 10,
            uint flatsSold = 8,
            decimal totalValueSold = 1_000_000m,
            decimal averageTotalPrice = 500_000m)
        {
            var gusHousing = GusHousingListing.Create(
                cityCode: cityCode,
                cityName: cityName,
                period: new QuarterPeriod(year, quarter),
                medianPricePerSqm: PricePerSquareMeter.FromDecimal(medianPricePerSqm),
                averagePricePerSqm: PricePerSquareMeter.FromDecimal(averagePricePerSqm),
                flatsCompleted: new Volume(flatsCompleted),
                flatsSold: new Volume(flatsSold),
                totalValueSold: Money.FromDecimal(totalValueSold),
                averageTotalPrice: Money.FromDecimal(averageTotalPrice)
            );

            db.GusHousingListings.Add(gusHousing);
            return gusHousing;
        }
    }
}
