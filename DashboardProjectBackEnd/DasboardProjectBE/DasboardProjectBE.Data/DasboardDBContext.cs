using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace DasboardProjectBE.Data
{
    public class DasboardDBContext : DbContext
    {
        public DasboardDBContext(DbContextOptions dbContextOptions) : base (dbContextOptions)
        {

        }

        public DbSet<BirthdayEntity> Birthdays { get; set; }
        public DbSet<EventEntity> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
