using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsRecentYears;
using RealEstateAnalyzer.Application.Validators;
using RealEstateAnalyzer.Infrastructure;

namespace RealEstateAnalyzer.Application.UseCases.GusHousingListings.GetGusHousingListingsCustomRange;
public record GusHousingListingData(
    string CityCode,
    uint Quarter,
    uint Year,
    decimal MedianPricePerSqm,
    decimal AveragePricePerSqm,
    uint FlatsCompleted,
    uint FlatsSold,
    decimal TotalValueSold,
    decimal AverageTotalPrice
);
public record GetGusHousingListingsCustomRangeQueryResponse(
    IReadOnlyList<GusHousingListingData> Listings
);
public record GetGusHousingListingsCustomRangeQuery(string CityName,
    uint YearsFrom,
    uint YearsTo,
    uint MonthFrom,
    uint MonthTo) : IRequest<GetGusHousingListingsCustomRangeQueryResponse>;

public class GetGusHousingListingsCustomRangeQueryHandler(
    DatabaseContext context,
    ILogger<GetGusHousingListingsCustomRangeQueryHandler> logger)
    : IRequestHandler<GetGusHousingListingsCustomRangeQuery, GetGusHousingListingsCustomRangeQueryResponse>
{
    public async Task<GetGusHousingListingsCustomRangeQueryResponse> Handle(GetGusHousingListingsCustomRangeQuery request, CancellationToken cancellationToken)
    {
        var allListingsForCity = await context.GusHousingListings
            .AsNoTracking()
            .Where(l => l.CityName.Contains(request.CityName.ToLower()))
            .Select(l => new GusHousingListingDto(
                l.CityName,
                l.CityCode,
                l.Period,
                l.MedianPricePerSqm,
                l.AveragePricePerSqm,
                l.TotalValueSold,
                l.AverageTotalPrice,
                l.FlatsCompleted,
                l.FlatsSold
            ))
            .ToListAsync(cancellationToken);

        if (!allListingsForCity.Any())
        {
            logger.LogWarning("No listings found for city {CityName}.",
                request.CityName);

            return new GetGusHousingListingsCustomRangeQueryResponse(
                new List<GusHousingListingData>());
        }

        var monthFrom = request.MonthFrom;
        var monthTo = request.MonthTo;
        var startQuarter = (uint)Math.Ceiling(monthFrom / 3.0);
        var endQuarter = (uint)Math.Ceiling(monthTo / 3.0);

        uint yearsFrom = request.YearsFrom;
        uint yearsTo = request.YearsTo;

        var filtered = allListingsForCity.Where(l =>
            (l.Period.Year > yearsFrom && l.Period.Year < yearsTo)
            ||
            (l.Period.Year == yearsFrom && l.Period.Quarter >= startQuarter)
            ||
            (l.Period.Year == yearsTo && l.Period.Quarter <= endQuarter)
        );

        var latest = filtered
            .OrderByDescending(l => l.Period.Year)
            .ThenByDescending(l => l.Period.Quarter)
            .Select(l => new GusHousingListingData(
                l.CityCode,
                l.Period.Quarter,
                l.Period.Year,
                l.MedianPricePerSqm.Price,
                l.AveragePricePerSqm.Price,
                l.FlatsCompleted.Count,
                l.FlatsSold.Count,
                l.TotalValueSold.Amount, l.AverageTotalPrice.Amount
            ))
            .ToList();

        logger.LogInformation(
            "Retrieved {Count} listings for city {CityName} in custom range: {YearsFrom}-{YearsTo}, months {MonthFrom}-{MonthTo}",
            latest.Count,
            request.CityName,
            yearsFrom,
            yearsTo,
            monthFrom,
            monthTo
        );

        return new GetGusHousingListingsCustomRangeQueryResponse(latest);
    }
}

public class GetGusHousingListingsCustomRangeQueryValidator : AbstractValidator<GetGusHousingListingsCustomRangeQuery>
{
    public GetGusHousingListingsCustomRangeQueryValidator()
    {
        RuleFor(x => x.CityName)
            .CityNameCorrectConvention();

        RuleFor(x => x.YearsFrom)
            .LessThan(x => x.YearsTo)
            .WithMessage(ValidationErrorMessages.YearsFromGreaterThanYearsTo);

        RuleFor(x => (int)x.YearsFrom)
            .YearsBackCorrectConvention();

        RuleFor(x => x.MonthFrom)
            .LessThan(x => x.MonthTo)
            .WithMessage(ValidationErrorMessages.MonthsToGreaterThanMonthsFrom);

        RuleFor(x => x.MonthFrom)
            .InclusiveBetween(1u, 12u)
            .WithMessage(ValidationErrorMessages.MonthOutOfRange);


        RuleFor(x => x.MonthTo)
            .InclusiveBetween(1u, 12u)
            .WithMessage(ValidationErrorMessages.MonthOutOfRange);
    }
}