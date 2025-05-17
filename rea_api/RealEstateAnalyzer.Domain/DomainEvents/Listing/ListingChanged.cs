using MediatR;

namespace RealEstateAnalyzer.Domain.DomainEvents.Listing;

public sealed class ListingChanged(Guid ListingId) : INotification;
