using MediatR;
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

        public Task DisposeAsync()
        {
            _arrangeScope.Dispose();
            _assertScope.Dispose();
            _factory.Dispose();
            return Task.CompletedTask;
        }

        protected void Arrange_Database(Action<DatabaseContext> arrange)
        {
            var db = _arrangeScope.ServiceProvider.GetRequiredService<DatabaseContext>();
            arrange(db);
            db.SaveChanges();
        }
    }
}
