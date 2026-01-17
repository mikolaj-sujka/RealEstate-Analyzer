using Newtonsoft.Json;
using RealEstateAnalyzer.Api.Extensions.ValidationExtensions;

namespace RealEstateAnalyzer.Api.Extensions.ApiErrorExtensions
{
    public class ApiErrorResult
    {
        public List<ApiErrorExtensions.ApiError> Errors { get; } = new();
        public List<ApiErrorExtensions.ApiError> Warnings { get; } = new();

        public string? Source { get; set; }

        public ApiErrorResult()
        {
        }

        public ApiErrorResult(string errorMessage, string errorCode)
        {
            Errors.Add(new ApiErrorExtensions.ApiError(errorCode, errorMessage));
        }

        public ApiErrorResult(IEnumerable<ApiErrorExtensions.ApiError> errors, IEnumerable<ApiErrorExtensions.ApiError> warnings)
        {
            Errors.AddRange(errors);
            Warnings.AddRange(warnings);
        }

        /// <summary>
        /// Allows to create ApiErrorResult object with ApiError array which are retrieved from ValidationException.
        /// </summary>
        /// <param name="ex">Contains error list with ValidationError type.</param>
        /// <param name="source">Value to set inside ApiErrorResult and ApiError when ValidationError source is null.</param>
        /// <returns></returns>
        public static ApiErrorResult CreateFrom(ValidationException ex)
        {
            var errors = ex.ValidationErrors
                    .Where(x => x.Severity == ValidationErrorSeverity.Error)
                .Select(x => new ApiError(x.ErrorCode, x.ErrorMessage, x.FieldName))
                .ToArray();


            var warnings = ex.ValidationErrors
                .Where(x => x.Severity == ValidationErrorSeverity.Warning)
                .Select(x => new ApiError(x.ErrorCode, x.ErrorMessage, x.FieldName))
                .ToArray();

            var result = new ApiErrorResult(errors, warnings);
            return result;
        }

        public string ToJsonString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
