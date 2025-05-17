namespace RealEstateAnalyzer.Domain.Infrastructure;
public class AuditableAggregateRoot : AggregateRoot, IAuditable
{
    public string CreatedBy { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}