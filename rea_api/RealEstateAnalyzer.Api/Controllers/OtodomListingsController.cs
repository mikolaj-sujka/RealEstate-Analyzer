using MediatR;
using Microsoft.AspNetCore.Mvc;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllCities;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomAllVoivodeships;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityData;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomCityDistricts;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomLatestTransactions;
using RealEstateAnalyzer.Application.UseCases.OtodomHousingListings.GetOtodomVoivodeshipData;

namespace RealEstateAnalyzer.Api.Controllers;

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
public class OtodomListingsController(IMediator mediator) : ControllerBase
{
    [HttpGet("districts")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomCityDistrictsListings(
        [FromQuery] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDistrictsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("voivodeship/{voivodeship}")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomVoivodeshipDataListings(
        [FromRoute] string voivodeship)
    {
        var listings = await mediator.Send(
            new GetOtodomVoivodeshipDataQuery(voivodeship));
        return StatusCode(200, listings);
    }

    [HttpGet("city/{cityName}")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomCityDataListings(
        [FromRoute] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDataListingsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("all-cities")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomAllCitiesListings()
    {
        var listings = await mediator.Send(
            new GetOtodomAllCitiesQuery());
        return StatusCode(200, listings);
    }

    [HttpGet("all-voivodeships")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomAllVoivodeshipsListings()
    {
        var listings = await mediator.Send(
            new GetOtodomAllVoivodeshipsQuery());
        return StatusCode(200, listings);
    }

    [HttpGet("latest-transactions")]
    [MapToApiVersion("1")]
    public async Task<IActionResult> GetOtodomLatestTransactionsListings()
    {
        var listings = await mediator.Send(
            new GetOtodomLatestTransactionsQuery());
        return StatusCode(200, listings);
    }
}