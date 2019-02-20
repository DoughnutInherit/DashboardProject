using Microsoft.EntityFrameworkCore.Migrations;

namespace DasboardProjectBE.Data.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_TypeEntity_TypeId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TypeEntity",
                table: "TypeEntity");

            migrationBuilder.RenameTable(
                name: "TypeEntity",
                newName: "Types");

            migrationBuilder.AddColumn<string>(
                name: "CompleteName",
                table: "Birthdays",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Birthdays",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Types",
                table: "Types",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Types_TypeId",
                table: "Events",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Types_TypeId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Types",
                table: "Types");

            migrationBuilder.DropColumn(
                name: "CompleteName",
                table: "Birthdays");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Birthdays");

            migrationBuilder.RenameTable(
                name: "Types",
                newName: "TypeEntity");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TypeEntity",
                table: "TypeEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_TypeEntity_TypeId",
                table: "Events",
                column: "TypeId",
                principalTable: "TypeEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
