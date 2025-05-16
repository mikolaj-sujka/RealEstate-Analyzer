using Microsoft.AspNetCore.Mvc;

namespace RealEstateAnalyzer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpGet]
    public ActionResult GetTestAuth()
    {
        return Ok("Auth is working");
    }
}