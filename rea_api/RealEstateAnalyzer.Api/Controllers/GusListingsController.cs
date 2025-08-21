using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsCustomRange;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsRecentYears;

namespace RealEstateAnalyzer.Api.Controllers;

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class GusListingsController(IRedisCacheListingsService redis, IMediator mediator) : ControllerBase
{

    [HttpGet]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera dane o mieście.")]
    [EndpointDescription("Zwraca szczegółowe dane dla miasta w Polsce.")]
    public async Task<IActionResult> GetGusHousingListingsByCity(
        [FromQuery] string cityName)
    {
        var listings = await redis.GetGusHousingListingsByCity(cityName);
            
        return StatusCode(200, listings);
    }

    [HttpGet("{yearsBack}")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera dane o mieście w danych latach.")]
    [EndpointDescription("Zwraca szczegółowe dane dla miasta w Polsce w zadanych latach.")]

    public async Task<IActionResult> GetGusHousingListingsRecentYears(
        [FromQuery] string cityName, 
        [FromRoute] uint yearsBack)
    {
        var listings = await mediator.Send(
            new GetGusHousingListingsRecentYearsQuery(cityName, yearsBack));

        return StatusCode(200, listings);
    }

    [HttpGet("date-range")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera dane o mieście w niestandardowym okresie.")]
    [EndpointDescription("Zwraca szczegółowe dane dla miasta w Polsce w zadanym niestandardowym okresie.")]

    public async Task<IActionResult> GetGusHousingListingsCustomRange(
        [FromQuery] string cityName,
        [FromQuery] uint yearsFrom,
        [FromQuery] uint yearsTo,
        [FromQuery] uint monthFrom,
        [FromQuery] uint monthTo)
    {
        var listings = await mediator.Send(
            new GetGusHousingListingsCustomRangeQuery(cityName, yearsFrom, yearsTo, monthFrom, monthTo));
        return StatusCode(200, listings);
    }

    [HttpGet("all-cities")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera listę miast.")]
    [EndpointDescription("Zwraca listę miast w Polsce, które są zapisane w bazie danych.")]
    public async Task<IActionResult> GetGusHousingListingsAllCities()
    {
        var listings = await redis.GetGusHousingListingsAllCities();
        return StatusCode(200, listings);
    }
}
