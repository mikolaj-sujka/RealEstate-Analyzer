using MediatR;

namespace RealEstateAnalyzer.Api.Services;

public class HangfireRecurringJobConfiguratorHostedService(IServiceProvider serviceProvider) : BackgroundService
{
    private readonly IMediator _mediator = serviceProvider.CreateScope().ServiceProvider.GetRequiredService<IMediator>();

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        //await _mediator.Send(new UpdateBackgroundJobsCommand(), stoppingToken);
    }
}