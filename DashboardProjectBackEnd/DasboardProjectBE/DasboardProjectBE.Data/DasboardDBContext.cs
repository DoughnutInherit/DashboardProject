using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace DasboardProjectBE.Data
{
    public class DasboardDBContext : DbContext
    {
        protected DasboardDBContext()
        {

        }

        public DasboardDBContext(DbContextOptions<DasboardDBContext> dbContextOptions) : base (dbContextOptions)
        {

        }

        public DbSet<BirthdayEntity> Birthdays { get; set; }
        public DbSet<EventEntity> Events { get; set; }
        public DbSet<TypeEntity> Types { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
