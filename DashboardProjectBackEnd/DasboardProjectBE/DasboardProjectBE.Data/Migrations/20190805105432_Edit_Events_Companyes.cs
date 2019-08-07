using Microsoft.EntityFrameworkCore.Migrations;

namespace DasboardProjectBE.Data.Migrations
{
    public partial class Edit_Events_Companyes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientCompanyName",
                table: "Events",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientCompanyName",
                table: "Events");
        }
    }
}
