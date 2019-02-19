using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.Data.Configurations
{
    public class BirthdayConfiguration : IEntityTypeConfiguration<BirthdayEntity>
    {
        public void Configure(EntityTypeBuilder<BirthdayEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}
