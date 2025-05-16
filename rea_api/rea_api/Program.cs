using Microsoft.AspNetCore.Builder;
using RealEstateAnalyzer.Api.Extensions;
using RealEstateAnalyzer.Infrastructure;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// builder.Services.AddDataLayer(builder.Configuration);

builder.Services.AddHangfire(builder.Configuration);

builder.Services.AddHangfireAuthorizationWithPolicies();

var app = builder.Build();

app.MapHangfire(builder.Configuration);

app.MapScalarApiReference();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseHttpsRedirection();

app.Run();


