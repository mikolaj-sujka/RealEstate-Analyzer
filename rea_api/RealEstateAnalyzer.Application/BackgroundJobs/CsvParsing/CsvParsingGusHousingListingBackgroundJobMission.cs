using Hangfire;
using Hangfire.MissionControl;
using MediatR;
using RealEstateAnalyzer.Application.UseCases.GetGusHousingListingsFromCsv;

namespace RealEstateAnalyzer.Application.BackgroundJobs.CsvParsing;

[MissionLauncher(CategoryName = "CsvParsing Gus Files")]
[Queue("import-files")]
public class CsvParsingGusHousingListingBackgroundJobMission(IMediator mediator, 
    IJobCancellationToken cancellationToken)
{
    [Mission(Name = "Import Gus csv files", 
        Description = "Imports GUS housing listings from CSV files. ")]
    [DisableConcurrentExecution(60 * 60 * 6)]
    [JobDisplayName("Import Gus csv files.")]
    public async Task Run()
    {
        await mediator.Send(new GetGusHousingListingsFromCsvQuery(), cancellationToken.ShutdownToken);
    }
}