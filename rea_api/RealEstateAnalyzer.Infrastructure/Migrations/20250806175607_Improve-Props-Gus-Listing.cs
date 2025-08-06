using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateAnalyzer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ImprovePropsGusListing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConstructionStarts",
                table: "GusHousingListings",
                newName: "FlatsSold");

            migrationBuilder.AddColumn<decimal>(
                name: "AverageTotalPrice",
                table: "GusHousingListings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageTotalPrice",
                table: "GusHousingListings");

            migrationBuilder.RenameColumn(
                name: "FlatsSold",
                table: "GusHousingListings",
                newName: "ConstructionStarts");
        }
    }
}
