using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using RealEstateAnalyzer.Api.Extensions.ApiErrorExtensions;

namespace RealEstateAnalyzer.Infrastructure.Tests.Extensions
{
    public static class HttpClientExtensions
    {
        public static async Task<T> GetOkResponseAsync<T>(this HttpClient client, string url)
        {
            var httpResponse = await client.GetAsync(url);
            return await httpResponse.ReadOkResponseAsync<T>();
        }

        public static async Task<ApiErrorResult> GetBadRequestAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.GetAsync(url);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task GetForbiddenAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.GetAsync(url);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        public static async Task<ApiErrorResult> GetNotFoundResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.GetAsync(url);
            return await httpResponse.ReadNotFoundResponseAsync();
        }

        /* Post */
        public static async Task PostOkResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PostAsJsonAsync(url, command);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task<TResult> PostOkResponseAsync<TResult, TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PostAsJsonAsync(url, command);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task PostOkResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PostAsync(url, null);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task<TResult> PostContentOkResponseAsync<TResult>(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PostAsync(url, content);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task<TResult> PostOkResponseAsync<TResult>(this HttpClient client, string url)
        {
            var httpResponse = await client.PostAsync(url, null);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task<ApiErrorResult> PostBadRequestResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PostAsJsonAsync(url, command);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PostBadRequestResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PostAsync(url, null);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        [Obsolete("Use PostContentBadRequestResponseAsync")]
        public static async Task<ApiErrorResult> PostBadRequestResponseAsync(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PostAsync(url, content);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PostContentBadRequestResponseAsync(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PostAsync(url, content);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PostUnauthorizedAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PostAsJsonAsync(url, command);
            return await httpResponse.ReadUnauthorizedResponseAsync();
        }

        public static async Task PostForbiddenResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PostAsJsonAsync(url, command);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        public static async Task PostForbiddenResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PostAsync(url, null);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        public static async Task<ApiErrorResult> PostNotFoundResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PostAsync(url, null);
            return await httpResponse.ReadNotFoundResponseAsync();
        }

        /* Put */
        public static async Task PutOkResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PutAsJsonAsync(url, command);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task<TResult> PutOkResponseAsync<TResult, TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PutAsJsonAsync(url, command);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task PutOkResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PutAsync(url, null);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task PutContentOkResponseAsync(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PutAsync(url, content);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task<ApiErrorResult> PutContentNotFoundResponseAsync(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PutAsync(url, content);
            return await httpResponse.ReadNotFoundResponseAsync();
        }

        public static async Task<TResult> PutContentOkResponseAsync<TResult>(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PutAsync(url, content);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task<TResult> PutOkResponseAsync<TResult>(this HttpClient client, string url)
        {
            var httpResponse = await client.PutAsync(url, null);
            return await httpResponse.ReadOkResponseAsync<TResult>();
        }

        public static async Task<ApiErrorResult> PutBadRequestResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PutAsJsonAsync(url, command);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PutContentBadRequestResponseAsync(this HttpClient client, string url, HttpContent content)
        {
            var httpResponse = await client.PutAsync(url, content);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PutBadRequestResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PutAsync(url, null);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> PutNotFoundResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PutAsJsonAsync(url, command);
            return await httpResponse.ReadNotFoundResponseAsync();
        }

        public static async Task<ApiErrorResult> PutNotFoundResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.PutAsync(url, null);
            return await httpResponse.ReadNotFoundResponseAsync();
        }

        public static async Task PutForbiddenResponseAsync<TCommand>(this HttpClient client, string url, TCommand command)
        {
            var httpResponse = await client.PutAsJsonAsync(url, command);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        /* delete */
        public static async Task DeleteOkResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.DeleteAsync(url);
            await httpResponse.AssertResponseHasStatusOkAsync();
        }

        public static async Task DeleteForbiddenResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.DeleteAsync(url);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }

        public static async Task<ApiErrorResult> DeleteBadRequestResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.DeleteAsync(url);
            return await httpResponse.ReadBadRequestResponseAsync();
        }

        public static async Task<ApiErrorResult> DeleteNotFoundResponseAsync(this HttpClient client, string url)
        {
            var httpResponse = await client.DeleteAsync(url);
            return await httpResponse.ReadNotFoundResponseAsync();
        }
        public static async Task DeleteForbiddenResponseAsync<TCommand>(this HttpClient client, string url)
        {
            var httpResponse = await client.DeleteAsync(url);
            httpResponse.StatusCode.Should().Be(HttpStatusCode.Forbidden);
        }
    }
}
