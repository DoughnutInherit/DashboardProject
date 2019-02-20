using DasboardProjectBE.Data;
using DasboardProjectBE.Data.Repositories;
using DasboardProjectBE.ServiceLibrary.Common.Contracts;
using DasboardProjectBE.ServiceLibrary.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace DasboardProjectBE.ServiceLibrary.IoC
{
    public static class IocRegister
    {

        public static IServiceCollection AddRegistration(this IServiceCollection services)
        {
            AddRegisterRepositories(services);
            AddRegisterServices(services);
            return services;
        }

        public static IServiceCollection AddRegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IEventService, EventService>();

            return services;

        }
        public static IServiceCollection AddRegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IEventRepository, EventRepository>();

            return services;
        }
    }
}
