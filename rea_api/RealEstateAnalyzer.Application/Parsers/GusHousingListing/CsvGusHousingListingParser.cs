using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.Abstractions;

namespace RealEstateAnalyzer.Application.Parsers.GusHousingListing;

public record GusHousingCsvRow(
    Guid CityId,
    string CityName,
    uint Year,
    uint Quarter,
    double MedianPricePerSqm,
    double AveragePricePerSqm,
    double FlatsCompleted,
    double ConstructionStarts,
    double AverageFlatSize,
    double TotalValueSold);
public class CsvGusHousingListingParser(ILogger<CsvGusHousingListingParser> logger, IHostEnvironment env)
    : IFileParser<Domain.Entities.GusHousingListing>
{
    private readonly string _directory = Path.GetFullPath(
        Path.Combine(env.ContentRootPath,"..", "RealEstateAnalyzer-Csv-Files"));

    public async Task<ParseResult<Domain.Entities.GusHousingListing>> ParseAsync(CancellationToken cancellationToken)
    {
        if (!await DirectoryExists(_directory)) return await Task.FromResult(ParseFailure());
        
        var found = Directory.EnumerateFiles(_directory)
            .Select(Path.GetFileName)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        logger.LogInformation("Files in folder: {Files}", string.Join(", ", found));

        return await Task.FromResult(ParseSuccess());
    }

    private Task<bool> DirectoryExists(string directory)
    {
        if (Directory.Exists(directory))
        {
            return Task.FromResult(true);
        }
        logger.LogError("Directory does not exist: {Directory}", directory);
        return Task.FromResult(false);
    }

    private static ParseResult<Domain.Entities.GusHousingListing> ParseFailure(params string[] errs)
        => new(
            Array.Empty<Domain.Entities.GusHousingListing>(), errs, Success: false);

    private static ParseResult<Domain.Entities.GusHousingListing> ParseSuccess()
    => new(
        Array.Empty<Domain.Entities.GusHousingListing>(), 
        Array.Empty<string>(), 
        Success: true);
}