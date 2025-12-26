using Microsoft.AspNetCore.Mvc;

namespace BackendCSharp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    private static readonly Random Random = new();

    [HttpGet]
    public IActionResult GetStats()
    {
        Response.Headers.Append("Cache-Control", "public, max-age=60");

        return Ok(new
        {
            total_games = "Infinite",
            total_players = 2300,
            online_now = Random.Next(200, 400),
            price = 13.00,
            countries = 150
        });
    }

    [HttpGet("online")]
    public IActionResult GetOnlineUsers()
    {
        Response.Headers.Append("Cache-Control", "no-cache");

        return Ok(new
        {
            online = Random.Next(200, 400),
            peak_today = Random.Next(500, 800)
        });
    }
}

