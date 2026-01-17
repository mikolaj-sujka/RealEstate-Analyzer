namespace RealEstateAnalyzer.Api.Extensions.ApiErrorExtensions
{
    public class ApiError
    {
        public ApiError()
        {
        }

        public ApiError(string code, string message, string? fieldName = null)
        {
            Code = code;
            Message = message;
            FieldName = fieldName;
        }

        public string? Code { get; set; }

        public string? Message { get; set; }

        public string? FieldName { get; set; }

        public override string ToString()
        {
            return $"FieldName: '{FieldName}', Code: '{Code}', Message: '{Message}'";
        }
    }
}
