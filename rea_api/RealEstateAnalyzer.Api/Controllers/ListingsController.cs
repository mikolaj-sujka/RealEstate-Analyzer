using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.Abstractions;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsCustomRange;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsRecentYears;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityData;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityDistricts;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomVoivodeshipData;

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

    [HttpGet("gus-housing-listings/date-range")]
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

    [HttpGet("otodom-listings/districts")]
    public async Task<IActionResult> GetOtodomCityDistrictsListings(
        [FromQuery] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDistrictsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("otodom-listings/voivodeship/{voivodeship}")]
    public async Task<IActionResult> GetOtodomVoivodeshipDataListings(
        [FromRoute] string voivodeship)
    {
        var listings = await mediator.Send(
            new GetOtodomVoivodeshipDataQuery(voivodeship));
        return StatusCode(200, listings);
    }

    [HttpGet("otodom-listings/city/{cityName}")]
    public async Task<IActionResult> GetOtodomCityDataListings(
        [FromRoute] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDataListingsQuery(cityName));
        return StatusCode(200, listings);
    }


}
