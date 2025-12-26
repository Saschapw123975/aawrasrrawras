using BackendCSharp.Models;
using BackendCSharp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendCSharp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly SteamService _steamService;

    public GamesController(SteamService steamService)
    {
        _steamService = steamService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGames([FromQuery] int page = 1, [FromQuery] int limit = 8)
    {
        page = Math.Max(1, page);
        limit = Math.Max(1, Math.Min(50, limit));

        var allGames = await _steamService.GetAllGamesAsync();
        var start = (page - 1) * limit;
        var end = start + limit;
        var paginatedGames = allGames.Skip(start).Take(limit).ToList();

        Response.Headers.Append("Cache-Control", "public, max-age=300");

        return Ok(new
        {
            games = paginatedGames,
            total = allGames.Count,
            page = page,
            shown = Math.Min(end, allGames.Count),
            has_more = end < allGames.Count
        });
    }
}

