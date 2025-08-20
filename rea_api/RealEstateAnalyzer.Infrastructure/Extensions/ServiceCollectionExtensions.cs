using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Microsoft.Extensions.Hosting;

namespace RealEstateAnalyzer.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDataLayer(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        var migrationAssemblyName = typeof(DatabaseContext).GetTypeInfo().Assembly.GetName().Name!;
        var connectionString = configuration.GetConnectionString("DefaultConnection")
                               ?? configuration["Database:ConnectionString"];

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Brak connection stringa: ustaw ConnectionStrings:DefaultConnection lub Database:ConnectionString.");

        services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseSqlServer(connectionString, sql =>
            {
                sql.MigrationsAssembly(migrationAssemblyName);
            });

            if (environment.IsDevelopment())
                options.EnableSensitiveDataLogging();
        });
    }
}
