using RealEstateAnalyzer.Domain.Infrastructure;

namespace RealEstateAnalyzer.Domain.ValueObjects;
public sealed class Money(decimal amount, string currency) : ValueObject
{
    public decimal Amount { get; } = amount;
    public string Currency { get; } = currency;

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }
}