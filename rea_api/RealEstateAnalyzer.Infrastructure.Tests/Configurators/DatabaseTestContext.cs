using Microsoft.EntityFrameworkCore;

namespace RealEstateAnalyzer.Infrastructure.Tests.Configurators
{
    public abstract class DatabaseTestContext<TDbContext> : IDisposable
        where TDbContext : DbContext
    {
        private TDbContext? _sqlServerDbContext;

        public IDataAccessLayerConfigurator GetDataAccessLayerConfigurator()
        {
            if (_sqlServerDbContext == null)
            {
                CreateDbContext();
            }

            return CreateSqlServerDataAccessLayerConfigurator();
        }

        public TDbContext CreateDbContext()
        {
            _sqlServerDbContext = CreateSqlServerDbContext();
            return _sqlServerDbContext;
        }

        protected abstract IDataAccessLayerConfigurator CreateSqlServerDataAccessLayerConfigurator();

        protected abstract TDbContext CreateSqlServerDbContext();

        public void Dispose()
        {
            _sqlServerDbContext?.Database.EnsureDeleted();
        }
    }
}
