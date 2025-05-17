using MediatR;

namespace RealEstateAnalyzer.Domain.DomainEvents.Listing;

public sealed class ListingDeleted(Guid ListingId) : INotification;
