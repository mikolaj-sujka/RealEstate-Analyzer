using HealthChecks.UI.Client;
using HealthChecks.UI.Configuration;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using RealEstateAnalyzer.Api.Extensions;
using RealEstateAnalyzer.Application.Extensions;
using RealEstateAnalyzer.Infrastructure.Extensions;
using RealEstateAnalyzer.Infrastructure.Hangfire.Extensions;
using RealEstateAnalyzer.Infrastructure.Redis.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddDataLayer(builder.Configuration);

builder.Services.AddRedis(builder.Configuration);

builder.Services.ConfigureHealthChecks(builder.Configuration);

builder.Services.AddHangfire(builder.Configuration);

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

app.MapScalarApiReference();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthChecks("/api/health", new HealthCheckOptions()
{
    Predicate = _ => true,
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
app.UseHealthChecksUI(delegate (Options options)
{
    options.UIPath = "/healthcheck-ui";
});

app.UseAuthentication();
app.UseAuthorization();

app.UseHangfireDashboardWithAuth(builder.Configuration);

app.MapControllers();

app.UseHttpsRedirection();

app.Run();


