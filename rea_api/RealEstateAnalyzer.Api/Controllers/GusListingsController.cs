using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsCustomRange;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsRecentYears;

namespace RealEstateAnalyzer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GusListingsController(IRedisCacheListingsService redis, IMediator mediator) : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetGusHousingListingsByCity(
        [FromQuery] string cityName)
    {
        var listings = await redis.GetGusHousingListingsByCity(cityName);
            
        return StatusCode(200, listings);
    }

    [HttpGet("{yearsBack}")]
    public async Task<IActionResult> GetGusHousingListingsRecentYears(
        [FromQuery] string cityName, 
        [FromRoute] uint yearsBack)
    {
        var listings = await mediator.Send(
            new GetGusHousingListingsRecentYearsQuery(cityName, yearsBack));

        return StatusCode(200, listings);
    }

    [HttpGet("date-range")]
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
    public async Task<IActionResult> GetGusHousingListingsAllCities()
    {
        var listings = await redis.GetGusHousingListingsAllCities();
        return StatusCode(200, listings);
    }
}
