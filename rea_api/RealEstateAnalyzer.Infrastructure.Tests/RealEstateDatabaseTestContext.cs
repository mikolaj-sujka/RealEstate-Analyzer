using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;

namespace RealEstateAnalyzer.Infrastructure.Tests
{
    public sealed class RealEstateDatabaseTestContext : DatabaseTestContext<DatabaseContext>
    {
        private readonly string _connectionString = Environment.GetEnvironmentVariable("REA_TEST_SQLSERVER")
                                                    ?? throw new InvalidOperationException(
                                                        "Missing env var REA_TEST_SQLSERVER (SQL Server connection string for integration tests).");

        private sealed class SqlServerDataAccessLayerConfigurator(string connectionString) : IDataAccessLayerConfigurator
        {
            public void Configure(IServiceCollection services)
            {
                services.AddDbContext<DatabaseContext>(opt => opt.UseSqlServer(connectionString));
            }
        }

        protected override IDataAccessLayerConfigurator CreateSqlServerDataAccessLayerConfigurator() 
            => new SqlServerDataAccessLayerConfigurator(_connectionString);

        protected override DatabaseContext CreateSqlServerDbContext()
        {
            var options = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlServer(_connectionString)
                .Options;

            var ctx = new DatabaseContext(options);

            ctx.Database.EnsureDeleted();
            ctx.Database.Migrate();

            return ctx;
        }
    }
}
