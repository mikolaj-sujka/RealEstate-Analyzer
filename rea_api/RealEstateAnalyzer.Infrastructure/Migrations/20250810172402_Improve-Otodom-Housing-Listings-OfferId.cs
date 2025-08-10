using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateAnalyzer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ImproveOtodomHousingListingsOfferId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OfferId",
                table: "OtodomHousingListings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_OtodomHousingListings_OfferId",
                table: "OtodomHousingListings",
                column: "OfferId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OtodomHousingListings_OfferId",
                table: "OtodomHousingListings");

            migrationBuilder.DropColumn(
                name: "OfferId",
                table: "OtodomHousingListings");
        }
    }
}
