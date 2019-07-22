using DasboardProjectBE.Configurations;
using DasboardProjectBE.Hubs;
using DasboardProjectBE.ServiceLibrary.IoC;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DasboardProjectBE
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      IocRegister.AddRegistration(services, Configuration);
      SwaggerConfig.AddRegistration(services);
      //CorsConfig.AddCorsOptions(services);
      services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
      {
        builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            //.AllowAnyOrigin()
            .WithOrigins("http://localhost:3000")
            .AllowCredentials();
      }));
      services.AddSignalR();
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
      }
      app.UseStaticFiles();
      app.UseCors("CorsPolicy");
      app.UseSignalR(routes =>
      {
        routes.MapHub<EventsHub>("/eventos");
      });

      app.UseHttpsRedirection();
      app.UseAuthentication();
      SwaggerConfig.AddRegistration(app);
      app.UseMvc();
    }
  }
}
