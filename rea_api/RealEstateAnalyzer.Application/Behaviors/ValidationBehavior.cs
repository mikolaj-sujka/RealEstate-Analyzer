using FluentValidation;
using MediatR;
using RealEstateAnalyzer.Application.Validators.ValidationExtensions;
using ValidationException = RealEstateAnalyzer.Application.Validators.ValidationExtensions.ValidationException;

namespace RealEstateAnalyzer.Application.Behaviors
{
    // Validation behavior for MediatR pipeline using FluentValidation validators -> middleware pattern
    public sealed class ValidationBehavior<TRequest, TResponse>(
        IEnumerable<IValidator<TRequest>> validators)
        : IPipelineBehavior<TRequest, TResponse>
        where TRequest : notnull
    {
        private const string DefaultErrorCode = "VALIDATION_ERROR";

        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {
            if (!validators.Any())
                return await next(cancellationToken);

            var context = new ValidationContext<TRequest>(request);

            var results = await Task.WhenAll(
                validators.Select(v => v.ValidateAsync(context, cancellationToken)));

            var failures = results
                .SelectMany(r => r.Errors)
                .Where(f => f is not null)
                .ToList();

            if (failures.Count != 0)
            {
                var ex = new ValidationException();

                foreach (var f in failures)
                {
                    var errorCode = string.IsNullOrWhiteSpace(f.ErrorCode) ? DefaultErrorCode : f.ErrorCode;

                    ex.ValidationErrors.Add(new ValidationError(
                        errorCode: errorCode,
                        errorMessage: f.ErrorMessage,
                        fieldName: f.PropertyName));
                }

                throw ex;
            }

            return await next(cancellationToken);
        }
    }
}
