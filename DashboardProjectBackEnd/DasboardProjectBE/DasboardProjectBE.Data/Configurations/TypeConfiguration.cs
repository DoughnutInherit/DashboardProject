using DasboardProjectBE.ServiceLibrary.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DasboardProjectBE.Data.Configurations
{
    public class TypeConfiguration
    {
        public void Configure(EntityTypeBuilder<TypeEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
        }
    }
}
