using System.Net;
using Microsoft.AspNetCore.Http;
using RealEstateAnalyzer.Application.Extensions.ApiErrorExtensions;

namespace RealEstateAnalyzer.Application.Validators.ValidationExtensions
{
    public sealed class ValidationExceptionMiddleware(RequestDelegate next)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                var payload = ApiErrorResult.CreateFrom(ex);
                await context.Response.WriteAsync(payload.ToJsonString());
            }
        }
    }
}
