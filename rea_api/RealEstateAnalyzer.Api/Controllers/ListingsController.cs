using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.UseCases.GetGusHousingListingsRecentYears;

namespace RealEstateAnalyzer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListingsController(IRedisCacheListingsService redis, IMediator mediator) : ControllerBase
{

    [HttpGet("gus-housing-listings")]
    public async Task<IActionResult> GetGusHousingListingsByCity(
        [FromQuery] string cityName)
    {
        var listings = await redis.GetGusHousingListingsByCity(cityName);
            
        return StatusCode(200, listings);
    }

    [HttpGet("gus-housing-listings/{yearsBack}")]
    public async Task<IActionResult> GetGusHousingListingsRecentYears(
        [FromQuery] string cityName, 
        [FromRoute] uint yearsBack)
    {
        var listings = await mediator.Send(
            new GetGusHousingListingsRecentYearsQuery(cityName, yearsBack));

        return StatusCode(200, listings);
    }
}
