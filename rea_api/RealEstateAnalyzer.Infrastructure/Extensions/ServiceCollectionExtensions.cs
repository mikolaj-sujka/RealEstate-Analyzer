using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;

namespace RealEstateAnalyzer.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDataLayer(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        var migrationAssemblyName = typeof(DatabaseContext).GetTypeInfo().Assembly.GetName().Name!;
        var connectionString = configuration.GetConnectionString("DefaultConnection")
                               ?? configuration["Database:DefaultConnection"];

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Missing connectionString.");

        services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseSqlServer(connectionString, sql =>
            {
                sql.MigrationsAssembly(migrationAssemblyName);
            });

            if (environment.IsDevelopment())
                options.EnableSensitiveDataLogging();
        });

        services.AddTransient<IStartupFilter, DatabaseMigrationStartupFilter>();
    }
}

file sealed class DatabaseMigrationStartupFilter : IStartupFilter
{
    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
    {
        return app =>
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>(); dbContext.Database.Migrate();
            } 
            
            next(app);
        };
    }
}
