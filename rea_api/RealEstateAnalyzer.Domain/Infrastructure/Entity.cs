namespace RealEstateAnalyzer.Domain.Infrastructure;

public abstract class Entity
{
    private int? requestedHashCode;

    public Guid Id { get; init; }

    private bool IsTransient()
    {
        return Id.Equals(default);
    }

    public override bool Equals(object? obj)
    {
        if (obj is not Entity item)
        {
            return false;
        }

        if (ReferenceEquals(this, item))
        {
            return true;
        }

        if (GetType() != item.GetType())
        {
            return false;
        }

        if (item.IsTransient() || IsTransient())
        {
            return false;
        }

        return item.Id.Equals(Id);
    }

    public override int GetHashCode()
    {
        if (!IsTransient())
        {
            if (!requestedHashCode.HasValue)
                requestedHashCode =
                    Id.GetHashCode() ^
                    31; // XOR for random distribution (http://blogs.msdn.com/b/ericlippert/archive/2011/02/28/guidelines-and-rules-for-gethashcode.aspx)

            return requestedHashCode.Value;
        }

        return base.GetHashCode();
    }

    public static bool operator ==(Entity? left, Entity? right)
    {
        return Equals(left, right);
    }

    public static bool operator !=(Entity? left, Entity? right)
    {
        return !Equals(left, right);
    }
}