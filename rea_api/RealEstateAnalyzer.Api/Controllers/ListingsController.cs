using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.Abstractions;

namespace RealEstateAnalyzer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ListingsController(IRedisCacheListingsService redis) : ControllerBase
{

    [HttpGet("gus-housing-listings")]
    public async Task<IActionResult> GetGusHousingListingsByCity(
        [FromQuery] string cityName)
    {
        var listings = await redis.GetGusHousingListingsByCity(cityName);
            
        return StatusCode(200, listings);
    }
}
