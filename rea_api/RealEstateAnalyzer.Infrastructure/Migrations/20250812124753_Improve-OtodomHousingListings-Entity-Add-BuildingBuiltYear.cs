using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateAnalyzer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ImproveOtodomHousingListingsEntityAddBuildingBuiltYear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "BuildingBuiltYear",
                table: "OtodomHousingListings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingBuiltYear",
                table: "OtodomHousingListings");
        }
    }
}
