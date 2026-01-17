using MediatR;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAnalyzer.Infrastructure.Tests.Configurators;
using Xunit;

namespace RealEstateAnalyzer.Infrastructure.Tests
{
    public abstract class IntegrationTestsBase : IAsyncLifetime
    {
        private readonly IntegrationTestWebApplicationFactory _factory = new();
        private IServiceScope _arrangeScope = null!;
        private IServiceScope _assertScope = null!;

        private IMediator Mediator { get; set; } = null!;

        public Task InitializeAsync()
        {
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

        protected Task<TResponse> Act_Send<TResponse>(IRequest<TResponse> request, CancellationToken ct = default)
            => Mediator.Send(request, ct);
    }
}
