using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Infrastructure.Tests.Stubs;

namespace RealEstateAnalyzer.Infrastructure.Tests.Configurators
{
    public sealed class IntegrationTestWebApplicationFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {

            builder.UseEnvironment("IntegrationTests");

            builder.ConfigureAppConfiguration((_, cfg) =>
            {
                cfg.SetBasePath(AppContext.BaseDirectory);
                cfg.AddJsonFile("appsettings.IntegrationTests.json", optional: false, reloadOnChange: false);
            });


            builder.ConfigureServices(services =>
            {
                using var tempProvider = services.BuildServiceProvider();
                using var tempScope = tempProvider.CreateScope();
                var configuration = tempScope.ServiceProvider.GetRequiredService<IConfiguration>();

                var connectionString = configuration.GetConnectionString("DefaultConnection");
                if (string.IsNullOrWhiteSpace(connectionString))
                    throw new InvalidOperationException("Missing ConnectionStrings:DefaultConnection in appsettings.IntegrationTests.json.");

                services.RemoveAll<DbContextOptions<DatabaseContext>>();
                services.AddDbContext<DatabaseContext>(opt => opt.UseSqlServer(connectionString));

                services.RemoveAll<IRedisCacheListingsService>();
                services.AddSingleton<IRedisCacheListingsService, RedisCacheListingsServiceStub>();

                using var finalProvider = services.BuildServiceProvider();
                using var finalScope = finalProvider.CreateScope();
                var db = finalScope.ServiceProvider.GetRequiredService<DatabaseContext>();
                db.Database.Migrate();
            });
        }
    }
}
