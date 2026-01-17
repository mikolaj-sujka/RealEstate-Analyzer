using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;
using Xunit;

namespace RealEstateAnalyzer.Infrastructure.Tests
{
    public abstract class IntegrationTestsBase : IAsyncLifetime
    {
        private IntegrationTestWebApplicationFactory _factory = null!;
        private IServiceScope _arrangeScope = null!;
        private IServiceScope _assertScope = null!;

        protected HttpClient Client { get; private set; } = null!;
        protected IMediator Mediator { get; private set; } = null!;

        public Task InitializeAsync()
        {
            _factory = new IntegrationTestWebApplicationFactory();

            Client = _factory.CreateClient();

            _arrangeScope = _factory.Services.CreateScope();
            _assertScope = _factory.Services.CreateScope();

            Mediator = _factory.Services.GetRequiredService<IMediator>();

            return Task.CompletedTask;
        }

        public async Task DisposeAsync()
        {
            await CleanupDatabaseAsync();

            _arrangeScope.Dispose();
            _assertScope.Dispose();
            await _factory.DisposeAsync();
        }

        protected void Arrange_Database(Action<DatabaseContext> arrange)
        {
            var db = _arrangeScope.ServiceProvider.GetRequiredService<DatabaseContext>();
            arrange(db);
            db.SaveChanges();
        }

        private async Task CleanupDatabaseAsync()
        {
            try
            {
                using var scope = _factory.Services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

                await db.OtodomHousingListings.ExecuteDeleteAsync();
                await db.GusHousingListings.ExecuteDeleteAsync();
            }
            catch
            {
                // ignored
            }
        }
    }
}
