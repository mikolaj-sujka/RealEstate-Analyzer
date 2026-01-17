namespace RealEstateAnalyzer.Application.Validators
{
    public static class ValidationErrorMessages
    {
        public const string CityNameInvalidCharacters = "City name must contain only letters (no digits) and may include spaces or hyphens.";
        public static readonly string CityNameLengthOutOfRange = $"City name must be at most {ValidationConstants.MaxCityNameLength} characters and at least, {ValidationConstants.MinCityNameLength}.";

        public const string YearsFromGreaterThanYearsTo = "Years From must be less than or equal to Years To.";

        public static readonly string YearsBackOutOfRange = $"Years Back must be between current year and {ValidationConstants.MaxYearsBack}.";

        public const string MonthsToGreaterThanMonthsFrom = "Months From must be less than or equal to Months To.";
        public const string MonthOutOfRange = "Month must be between 1 and 12.";
        
        public const string VoivodeshipNameInvalidCharacters = "Voivodeship name must contain only letters and may include spaces or hyphens.";
        public const string VoivodeshipNameCannotBeEmpty = "Voivodeship name cannot be empty.";
        public static readonly string VoivodeshipNameLengthOutOfRange = $"Voivodeship name must be at most {ValidationConstants.MaxVoivodeshipNameLength} characters.";
        public const string UnknownVoivodeshipName = "Unknown voivodeship name.";

        public static readonly string CityDistrictsInvalid = $"City district name must be at most {ValidationConstants.MaxCityDistrictNameLength} characters and at least, {ValidationConstants.MinCityDistrictNameLength}. It must contain only letters and may include spaces or hyphens.";
    }
}
