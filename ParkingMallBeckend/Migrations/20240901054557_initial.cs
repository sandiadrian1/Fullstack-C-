using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingMallBeckend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "typeTransportasis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nama = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    BiayaPerJam = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_typeTransportasis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "parkirs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeTransportasiId = table.Column<int>(type: "int", nullable: false),
                    PlateNomor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WaktuMasuk = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parkirs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_parkirs_typeTransportasis_TypeTransportasiId",
                        column: x => x.TypeTransportasiId,
                        principalTable: "typeTransportasis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "detailParkirs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParkirId = table.Column<int>(type: "int", nullable: false),
                    BiayaPerJam = table.Column<int>(type: "int", nullable: false),
                    BiayaParkir = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_detailParkirs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_detailParkirs_parkirs_ParkirId",
                        column: x => x.ParkirId,
                        principalTable: "parkirs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_detailParkirs_ParkirId",
                table: "detailParkirs",
                column: "ParkirId");

            migrationBuilder.CreateIndex(
                name: "IX_parkirs_TypeTransportasiId",
                table: "parkirs",
                column: "TypeTransportasiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "detailParkirs");

            migrationBuilder.DropTable(
                name: "parkirs");

            migrationBuilder.DropTable(
                name: "typeTransportasis");
        }
    }
}
