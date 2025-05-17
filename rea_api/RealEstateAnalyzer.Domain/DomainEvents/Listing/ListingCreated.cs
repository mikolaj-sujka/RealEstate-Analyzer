using MediatR;

namespace RealEstateAnalyzer.Domain.DomainEvents.Listing;

public sealed class ListingCreated(Guid ListingId) : INotification;
