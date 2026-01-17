namespace RealEstateAnalyzer.Api.Extensions.ValidationExtensions
{
    public class ValidationException : Exception
    {
        public List<ValidationError> ValidationErrors { get; } = new();

        public ValidationException()
        {

        }

        public ValidationException(Type objectType, string fieldName, string errorCode, string errorMessage,
            params object[] args)
            : base($"Validation failed with error code {errorCode}: {errorMessage}")
        {
            ValidationErrors.Add(new ValidationError(objectType, fieldName, errorCode, errorMessage, args));
        }

        public ValidationException(string errorCode, string errorMessage, params object[] args)
            : base($"Validation failed with error code {errorCode}: {errorMessage}")
        {
            ValidationErrors.Add(new ValidationError(errorCode, errorMessage));
        }
    }

    public class ValidationError
    {
        public ValidationError(Type objectType, string fieldName, string errorCode, string errorMessage, params object[] args)
        {
            Severity = ValidationErrorSeverity.Error;
            ObjectType = objectType;
            FieldName = fieldName;
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            Arguments = args;
        }

        public ValidationError(string errorCode, string errorMessage, string? fieldName = null, params object[] args)
        {
            Severity = ValidationErrorSeverity.Error;
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            FieldName = fieldName;
            Arguments = args;
        }

        public ValidationError(ValidationErrorSeverity severity, Type objectType, string fieldName, string errorCode, string errorMessage, params object[] args)
        {
            Severity = severity;
            ObjectType = objectType;
            FieldName = fieldName;
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            Arguments = args;
        }

        public ValidationError(ValidationErrorSeverity severity, string errorCode, string errorMessage, string? fieldName = null, params object[] args)
        {
            Severity = severity;
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            FieldName = fieldName;
            Arguments = args;
        }


        public ValidationErrorSeverity Severity { get; private set; }
        public string? Source { get; set; }
        public Type? ObjectType { get; }
        public string? FieldName { get; }
        public string ErrorCode { get; }
        public string ErrorMessage { get; }
        public object[] Arguments { get; }

        public override string ToString()
        {
            return string.IsNullOrWhiteSpace(Source)
                ? $"{Severity} {ErrorCode}: {ErrorMessage}"
                : $"{Severity} {ErrorCode}: {ErrorMessage}. Source: {Source}";
        }
    }

    public enum ValidationErrorSeverity
    {
        Error,
        Warning
    }
}
