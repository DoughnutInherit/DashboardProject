using DasboardProjectBE.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        public DasboardDBContext Context { get; set; }
        public UnitOfWork(string connectionString)
        {
            var builder = new DbContextOptionsBuilder<DasboardDBContext>();
            if (builder == null)
            {
                throw new ArgumentNullException($"Unit Of Work {nameof(DbContextOptionsBuilder)} is null");
            }
            builder.UseSqlServer(connectionString);
            if (Context == null)
            {
                Context = new DasboardDBContext(builder.Options);
            }
        }

        public void Commit()
            => Context?.SaveChangesAsync();

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
