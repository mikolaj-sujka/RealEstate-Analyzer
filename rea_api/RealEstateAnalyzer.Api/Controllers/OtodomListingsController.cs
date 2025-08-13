using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityData;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityDistricts;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomVoivodeshipData;

namespace RealEstateAnalyzer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OtodomListingsController(IMediator mediator) : ControllerBase
{
    [HttpGet("districts")]
    public async Task<IActionResult> GetOtodomCityDistrictsListings(
        [FromQuery] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDistrictsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("voivodeship/{voivodeship}")]
    public async Task<IActionResult> GetOtodomVoivodeshipDataListings(
        [FromRoute] string voivodeship)
    {
        var listings = await mediator.Send(
            new GetOtodomVoivodeshipDataQuery(voivodeship));
        return StatusCode(200, listings);
    }

    [HttpGet("city/{cityName}")]
    public async Task<IActionResult> GetOtodomCityDataListings(
        [FromRoute] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDataListingsQuery(cityName));
        return StatusCode(200, listings);
    }
}