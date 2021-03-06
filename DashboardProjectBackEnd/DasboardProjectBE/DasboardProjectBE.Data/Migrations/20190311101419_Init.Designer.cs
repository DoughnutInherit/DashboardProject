﻿// <auto-generated />
using System;
using DasboardProjectBE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DasboardProjectBE.Data.Migrations
{
    [DbContext(typeof(DasboardDBContext))]
    [Migration("20190311101419_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DasboardProjectBE.ServiceLibrary.Entities.BirthdayEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompleteName");

                    b.Property<DateTime>("Day");

                    b.Property<string>("ImageUrl");

                    b.HasKey("Id");

                    b.ToTable("Birthdays");
                });

            modelBuilder.Entity("DasboardProjectBE.ServiceLibrary.Entities.EventEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DepartureDate");

                    b.Property<string>("Description");

                    b.Property<DateTime>("EntryDate");

                    b.Property<string>("Title");

                    b.Property<int>("TypeId");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("DasboardProjectBE.ServiceLibrary.Entities.TypeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Types");
                });

            modelBuilder.Entity("DasboardProjectBE.ServiceLibrary.Entities.EventEntity", b =>
                {
                    b.HasOne("DasboardProjectBE.ServiceLibrary.Entities.TypeEntity", "Type")
                        .WithMany("Events")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
