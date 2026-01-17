using Xunit;

namespace RealEstateAnalyzer.Infrastructure.Tests.Configurators
{
    [CollectionDefinition(CollectionName)]
    public class DatabaseTestCollection : ICollectionFixture<DatabaseTestContext<DatabaseContext>>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
        public const string CollectionName = "Real Estate Analyzer database tests collection";
    }
}
