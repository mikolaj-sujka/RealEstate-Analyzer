namespace RealEstateAnalyzer.Application.Abstractions;

public record ParseResult<T>(IReadOnlyList<T> Records, IReadOnlyList<string> Errors, bool Success);
public interface IFileParser<T>
{
    Task<ParseResult<T>> ParseAsync(Stream fileStream, CancellationToken cancellationToken);
}