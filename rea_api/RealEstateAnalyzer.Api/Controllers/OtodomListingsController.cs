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
    [EndpointSummary("Pobiera dane o dzielnicach.")]
    [EndpointDescription("Zwraca szczegółowe dane dla dzielnic w wybranym miescie w Polsce.")]
    public async Task<IActionResult> GetOtodomCityDistrictsListings(
        [FromQuery] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDistrictsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("voivodeship/{voivodeship}")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera dane o województwie.")]
    [EndpointDescription("Zwraca szczegółowe dane dla województwa w Polsce.")]
    public async Task<IActionResult> GetOtodomVoivodeshipDataListings(
        [FromRoute] string voivodeship)
    {
        var listings = await mediator.Send(
            new GetOtodomVoivodeshipDataQuery(voivodeship));
        return StatusCode(200, listings);
    }

    [HttpGet("city/{cityName}")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera dane o mieście.")]
    [EndpointDescription("Zwraca szczegółowe dane wybranego miasta w Polsce.")]
    public async Task<IActionResult> GetOtodomCityDataListings(
        [FromRoute] string cityName)
    {
        var listings = await mediator.Send(
            new GetOtodomCityDataListingsQuery(cityName));
        return StatusCode(200, listings);
    }

    [HttpGet("all-cities")]
    [MapToApiVersion("1")]
    [EndpointSummary("Zwraca listę miast.")]
    [EndpointDescription("Zwraca listę wszystkich miast, które są zapisane w bazie danych.")]
    public async Task<IActionResult> GetOtodomAllCitiesListings()
    {
        var listings = await mediator.Send(
            new GetOtodomAllCitiesQuery());
        return StatusCode(200, listings);
    }

    [HttpGet("all-voivodeships")]
    [MapToApiVersion("1")]
    [EndpointSummary("Zwraca listę województw.")]
    [EndpointDescription("Zwraca listę wszystkich województw, które są zapisane w bazie danych.")]
    public async Task<IActionResult> GetOtodomAllVoivodeshipsListings()
    {
        var listings = await mediator.Send(
            new GetOtodomAllVoivodeshipsQuery());
        return StatusCode(200, listings);
    }

    [HttpGet("latest-transactions")]
    [MapToApiVersion("1")]
    [EndpointSummary("Pobiera ostatnie transakcje.")]
    [EndpointDescription("Zwraca listę najnowszych transakcji na rynku nieruchomości w Polsce wraz z szczegółowymi danymi odnośnie transakcji.")]
    public async Task<IActionResult> GetOtodomLatestTransactionsListings()
    {
        var listings = await mediator.Send(
            new GetOtodomLatestTransactionsQuery());
        return StatusCode(200, listings);
    }
}