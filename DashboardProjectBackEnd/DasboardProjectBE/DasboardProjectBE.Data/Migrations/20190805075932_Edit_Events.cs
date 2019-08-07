using Microsoft.EntityFrameworkCore.Migrations;

namespace DasboardProjectBE.Data.Migrations
{
    public partial class Edit_Events : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "Events",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientPosition",
                table: "Events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ClientPosition",
                table: "Events");
        }
    }
}
