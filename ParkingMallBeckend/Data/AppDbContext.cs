using Microsoft.EntityFrameworkCore;
using ParkingMallBeckend.Models;

namespace ParkingMallBeckend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions <AppDbContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Parkir> parkirs { get; set; }
        public DbSet<TypeTransportasi> typeTransportasis { get; set; }
        public DbSet<DetailParkir> detailParkirs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseSqlServer("Data Source=.\\sqlexpress;Initial Catalog=parking; User id=sa; password=sandiaja; TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Parkir>()
                .HasOne(p => p.TypeTransportasi)
                .WithMany()
                .HasForeignKey(p => p.TypeTransportasiId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<DetailParkir>()
                .HasOne(d => d.Parkir)
                .WithMany()
                .HasForeignKey(d => d.ParkirId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
