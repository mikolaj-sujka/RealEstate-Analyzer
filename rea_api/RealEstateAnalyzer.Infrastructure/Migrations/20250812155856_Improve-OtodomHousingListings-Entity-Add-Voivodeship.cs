using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateAnalyzer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ImproveOtodomHousingListingsEntityAddVoivodeship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location_Voivodeship",
                table: "OtodomHousingListings",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location_Voivodeship",
                table: "OtodomHousingListings");
        }
    }
}
