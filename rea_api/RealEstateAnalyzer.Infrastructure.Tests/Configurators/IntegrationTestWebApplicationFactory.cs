using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Api;

namespace RealEstateAnalyzer.Infrastructure.Tests.Configurators
{
    public sealed class IntegrationTestWebApplicationFactory : WebApplicationFactory<IProgram>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {

            builder.ConfigureAppConfiguration((_, cfg) =>
            {
                cfg.AddJsonFile("appsettings.tests.json", optional: false, reloadOnChange: false);
            });


            builder.ConfigureServices(services =>
            {
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

                var connectionString = configuration.GetConnectionString("DefaultConnection");
                if (string.IsNullOrWhiteSpace(connectionString))
                    throw new InvalidOperationException("Missing ConnectionStrings:DefaultConnection in appsettings.tests.json.");

                var dbContextDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<DatabaseContext>));

                if (dbContextDescriptor is not null)
                    services.Remove(dbContextDescriptor);

                services.AddDbContext<DatabaseContext>(opt => opt.UseSqlServer(connectionString));
            });
        }
    }
}
