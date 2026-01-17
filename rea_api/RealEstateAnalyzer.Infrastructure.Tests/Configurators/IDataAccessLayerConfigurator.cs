using Microsoft.Extensions.DependencyInjection;

namespace RealEstateAnalyzer.Infrastructure.Tests.Configurators
{
    public interface IDataAccessLayerConfigurator
    {
        void Configure(IServiceCollection services);
    }
}
