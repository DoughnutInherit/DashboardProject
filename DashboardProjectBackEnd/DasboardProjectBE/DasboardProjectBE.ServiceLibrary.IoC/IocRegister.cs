using DasboardProjectBE.Data;
using DasboardProjectBE.Data.Repositories;
using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Entities;
using DasboardProjectBE.ServiceLibrary.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DasboardProjectBE.ServiceLibrary.IoC
{
    public static class IocRegister
    {

        public static IServiceCollection AddRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            AddRegisterContexts(services, configuration);
            AddRegisterIdentity(services);
            AddRegisterAuthentication(services, configuration);
            AddRegisterRepositories(services);
            AddRegisterServices(services);

            return services;
        }

        public static IServiceCollection AddRegisterIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

            })
                    .AddEntityFrameworkStores<DasboardDBContext>();
            return services;
        }

        public static IServiceCollection AddRegisterAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:JwtKey"]));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = true,
                    ValidAudience = configuration["Tokens:JwtIssuer"],
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Tokens:JwtIssuer"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });

            return services;
        }
        public static IServiceCollection AddRegisterAuthentication (this IServiceCollection services, IConfiguration configuration)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = true,
                    ValidAudience = configuration["Tokens:Audience"],
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Tokens:Issuer"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });

            return services;
        }
        public static IServiceCollection AddRegisterContexts(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>(x => new UnitOfWork(configuration.GetConnectionString("DataBaseConnection")));
            services.AddDbContext<DasboardDBContext>(
                option => option.UseSqlServer(configuration.GetConnectionString("DataBaseConnection")));

            return services;
        }

        public static IServiceCollection AddRegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IEventService, EventService>()
                    .AddScoped<IBirthdayService, BirthdayService>();

            return services;
        }

        public static IServiceCollection AddRegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IEventRepository, EventRepository>()
                    .AddScoped<IBirthdayRepository, BirthdayRepository>();

            return services;
        }
    }
}
