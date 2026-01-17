using FluentValidation;

namespace RealEstateAnalyzer.Application.Validators
{
    public static class CustomValidators
    {
        public static IRuleBuilderOptions<T, string> VoivodeshipNameCorrectConvention<T>(
            this IRuleBuilder<T, string> ruleBuilder,
            int maxLength = 50)
        {
            return ruleBuilder
                .NotEmpty()
                .Must(s => !string.IsNullOrWhiteSpace(s))
                .WithMessage(ValidationErrorMessages.VoivodeshipNameCannotBeEmpty)
                .MaximumLength(maxLength)
                .WithMessage(ValidationErrorMessages.VoivodeshipNameLengthOutOfRange)
                .Matches(@"^[\p{L}\s-]+$")
                .WithMessage(ValidationErrorMessages.VoivodeshipNameInvalidCharacters);
        }

        public static IRuleBuilderOptions<T, string> VoivodeshipMustBeKnown<T>(
            this IRuleBuilder<T, string> ruleBuilder)
        {
            var allowed = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "dolnośląskie",
                "kujawsko-pomorskie",
                "lubelskie",
                "lubuskie",
                "łódzkie",
                "małopolskie",
                "mazowieckie",
                "opolskie",
                "podkarpackie",
                "podlaskie",
                "pomorskie",
                "śląskie",
                "świętokrzyskie",
                "warmińsko-mazurskie",
                "wielkopolskie",
                "zachodniopomorskie"
            };

            return ruleBuilder
                .Must(v => allowed.Contains(v.Trim()))
                .WithMessage(ValidationErrorMessages.UnknownVoivodeshipName);
        }

        public static IRuleBuilderOptions<T, string> CityNameCorrectConvention<T>(
            this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder
                .NotEmpty()
                .MaximumLength(ValidationConstants.MaxCityNameLength)
                .MinimumLength(ValidationConstants.MinCityNameLength)
                .WithMessage(ValidationErrorMessages.CityNameLengthOutOfRange)
                .Matches(@"^[\p{L}\s-]+$")
                .WithMessage(ValidationErrorMessages.CityNameInvalidCharacters);
        }

        public static IRuleBuilderOptions<T, int> YearsBackCorrectConvention<T>(
            this IRuleBuilder<T, int> ruleBuilder)
        {
            return ruleBuilder
                .GreaterThan(ValidationConstants.MaxYearsBack)
                .LessThanOrEqualTo(ValidationConstants.MinYearsBack)
                .WithMessage(ValidationErrorMessages.YearsBackOutOfRange);
        }

        public static IRuleBuilderOptions<T, List<string>> CityDistrictsCorrectConvention<T>(
            this IRuleBuilder<T, List<string>> ruleBuilder)
        {
            return ruleBuilder
                .Must(districts => districts != null && districts.All(d =>
                    !string.IsNullOrWhiteSpace(d) &&
                    d.Length >= ValidationConstants.MinCityDistrictNameLength &&
                    d.Length <= ValidationConstants.MaxCityDistrictNameLength &&
                    System.Text.RegularExpressions.Regex.IsMatch(d, @"^[\p{L}\s-]+$")))
                .WithMessage(ValidationErrorMessages.CityDistrictsInvalid);
        }
    }
}
