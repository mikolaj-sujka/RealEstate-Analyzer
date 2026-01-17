using Newtonsoft.Json;
using System.Net;
using FluentAssertions;
using RealEstateAnalyzer.Application.Extensions.ApiErrorExtensions;
using Xunit.Sdk;

namespace RealEstateAnalyzer.Infrastructure.Tests.Extensions
{
    public static class HttpResponseMessageExtensions
    {
        public static async Task<T> ReadAsync<T>(this HttpResponseMessage response)
        {
            var json = await response.Content.ReadAsStringAsync();
            try
            {
                var deserializedObject = JsonConvert.DeserializeObject<T>(json);

                return deserializedObject == null
                    ? throw NullException.ForNonNullValue($"Deserialized object {typeof(T).Name} is null.")
                    : deserializedObject;
            }
            catch (Exception ex)
            {
                ex.Should().BeNull($"exception during deserialization {json} as {typeof(T).Name} was not expected");
            }

            return default!;
        }

        public static async Task<T> ReadOkResponseAsync<T>(this HttpResponseMessage response)
        {
            await response.AssertResponseHasStatusOkAsync();

            return await response.ReadAsync<T>();
        }

        public static async Task<ApiErrorResult> ReadBadRequestResponseAsync(this HttpResponseMessage response)
        {
            return await response.ReadNonOkResponseAsync(HttpStatusCode.BadRequest);
        }

        public static async Task<ApiErrorResult> ReadNotFoundResponseAsync(this HttpResponseMessage response)
        {
            return await response.ReadNonOkResponseAsync(HttpStatusCode.NotFound);
        }

        public static async Task<ApiErrorResult> ReadUnauthorizedResponseAsync(this HttpResponseMessage response)
        {
            return await response.ReadNonOkResponseAsync(HttpStatusCode.Unauthorized);
        }

        public static async Task AssertResponseHasStatusOkAsync(this HttpResponseMessage response)
        {
            response.Should().NotBeNull();

            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                var error = await response.ReadAsync<ApiErrorResult>();
                var errorMessage =
                    $"Error messages: {string.Join("\n,", error.Errors.Select(x => x.Message))}";
                errorMessage.Should().BeEmpty();
            }
            else if (response.StatusCode != HttpStatusCode.OK)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                response.StatusCode.Should().Be(HttpStatusCode.OK, errorContent);
            }
        }

        public static async Task<ApiErrorResult> ReadNonOkResponseAsync(
            this HttpResponseMessage response,
            HttpStatusCode expectedStatusCode)
        {
            response.Should().NotBeNull();
            response.StatusCode.Should().Be(expectedStatusCode);
            var errorResponse = await response.ReadAsync<ApiErrorResult>();
            return errorResponse;
        }
    }
}
