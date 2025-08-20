using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SqlAlias;

namespace RealEstateAnalyzer.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDataLayer(this IServiceCollection services, IConfiguration configuration)
    {
        var migrationAssemblyName = typeof(DatabaseContext).GetTypeInfo().Assembly.GetName().Name;
        var connectionString = configuration.GetConnectionString("DefaultConnection")
                               ?? configuration["Database:ConnectionString"];
        services.AddDbContext<DatabaseContext>(
            options => options.UseSqlServer(connectionString,
                sqlOptions =>
                {
                    sqlOptions.MigrationsAssembly(migrationAssemblyName);
                }).EnableSensitiveDataLogging()
        );
    }
}