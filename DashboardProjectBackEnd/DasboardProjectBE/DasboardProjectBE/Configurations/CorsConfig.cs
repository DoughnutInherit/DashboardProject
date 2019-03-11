using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DasboardProjectBE.Configurations
{
    public static class CorsConfig
    {
        public static IServiceCollection AddCorsOptions(this IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy("AllowSpecificOrigins",
                builder =>
                {
                    builder.WithOrigins("*")
                            .WithMethods("")
                            .WithHeaders(HeaderNames.ContentType, "application/json");
                });
            });

            return services;
        }
    }
}
