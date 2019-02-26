using DasboardProjectBE.Data;
using DasboardProjectBE.Data.Repositories;
using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Common.Contracts.Repositories;
using DasboardProjectBE.ServiceLibrary.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DasboardProjectBE.ServiceLibrary.IoC
{
    public static class IocRegister
    {
        public static IServiceCollection AddRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            AddRegisterContexts(services, configuration);
            AddRegisterRepositories(services);
            AddRegisterServices(services);
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
