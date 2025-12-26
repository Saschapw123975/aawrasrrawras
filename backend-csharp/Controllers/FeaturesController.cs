using Microsoft.AspNetCore.Mvc;

namespace BackendCSharp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeaturesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetFeatures()
    {
        Response.Headers.Append("Cache-Control", "public, max-age=3600");

        return Ok(new
        {
            features = new[]
            {
                new { icon = "♾️", title = "Infinite Games", description = "Unlimited access" },
                new { icon = "🆓", title = "All Games Free", description = "Every game included" },
                new { icon = "💰", title = "One-Time Payment", description = "$13 forever" },
                new { icon = "☁️", title = "Cloud Saves", description = "Sync everywhere" },
                new { icon = "⚡", title = "Fast Servers", description = "Priority access" }
            }
        });
    }
}

