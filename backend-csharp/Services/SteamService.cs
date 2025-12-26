using System.Text.Json;
using BackendCSharp.Models;

namespace BackendCSharp.Services;

public class SteamService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly CacheService _cacheService;
    private const string SteamFeaturedUrl = "https://store.steampowered.com/api/featured";
    private const string SteamStorefrontUrl = "https://store.steampowered.com/api/featuredcategories";

    private static readonly List<Game> FallbackGames = new()
    {
        new Game { Id = 1, Name = "Cyberpunk 2077", Available = true },
        new Game { Id = 2, Name = "ELDEN RING", Available = true },
        new Game { Id = 3, Name = "Red Dead Redemption 2", Available = true },
        new Game { Id = 4, Name = "Grand Theft Auto V", Available = true },
        new Game { Id = 5, Name = "Hollow Knight", Available = true },
        new Game { Id = 6, Name = "Stardew Valley", Available = true },
        new Game { Id = 7, Name = "Fortnite", Available = true },
        new Game { Id = 8, Name = "Valorant", Available = true },
        new Game { Id = 9, Name = "Counter-Strike 2", Available = true },
        new Game { Id = 10, Name = "Dota 2", Available = true },
        new Game { Id = 11, Name = "Baldur's Gate 3", Available = true },
        new Game { Id = 12, Name = "God of War", Available = true },
        new Game { Id = 13, Name = "The Witcher 3", Available = true },
        new Game { Id = 14, Name = "Minecraft", Available = true },
        new Game { Id = 15, Name = "Terraria", Available = true }
    };

    public SteamService(IHttpClientFactory httpClientFactory, CacheService cacheService)
    {
        _httpClientFactory = httpClientFactory;
        _cacheService = cacheService;
    }

    public async Task<List<Game>> GetAllGamesAsync()
    {
        const string cacheKey = "steam_games_all";

        if (_cacheService.TryGetValue<List<Game>>(cacheKey, out var cachedGames))
        {
            return cachedGames ?? new List<Game>();
        }

        try
        {
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(5);
            client.DefaultRequestHeaders.Add("User-Agent", "Crymson/1.0");
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            var featuredTask = FetchFeaturedGamesAsync(client);
            var categoriesTask = FetchCategoriesAsync(client);

            await Task.WhenAll(featuredTask, categoriesTask);

            var featured = await featuredTask;
            var categories = await categoriesTask;

            var allGames = featured.Concat(categories).ToList();
            var uniqueGames = allGames
                .GroupBy(g => g.Id)
                .Select(g => g.First())
                .ToList();

            if (uniqueGames.Count < 160)
            {
                uniqueGames.AddRange(FallbackGames.Take(160 - uniqueGames.Count));
            }

            for (int i = 0; i < Math.Min(160, uniqueGames.Count); i++)
            {
                uniqueGames[i].Number = i + 1;
            }

            var result = uniqueGames.Take(160).ToList();
            _cacheService.Set(cacheKey, result);
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching Steam games: {ex.Message}");
            return FallbackGames.Take(160).ToList();
        }
    }

    private async Task<List<Game>> FetchFeaturedGamesAsync(HttpClient client)
    {
        try
        {
            var response = await client.GetAsync(SteamFeaturedUrl);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            var games = new List<Game>();
            var platforms = new[] { "featured_win", "featured_mac", "featured_linux" };

            foreach (var platform in platforms)
            {
                if (root.TryGetProperty(platform, out var platformElement))
                {
                    foreach (var gameElement in platformElement.EnumerateArray())
                    {
                        var game = new Game
                        {
                            Id = gameElement.TryGetProperty("id", out var idProp) ? idProp.GetInt32() : 0,
                            Name = gameElement.TryGetProperty("name", out var nameProp) ? nameProp.GetString() ?? "Unknown" : "Unknown",
                            Image = gameElement.TryGetProperty("header_image", out var headerProp) 
                                ? headerProp.GetString() ?? "" 
                                : (gameElement.TryGetProperty("large_capsule_image", out var capsuleProp) 
                                    ? capsuleProp.GetString() ?? "" : ""),
                            Available = true
                        };
                        if (game.Id > 0) games.Add(game);
                    }
                }
            }

            return games;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching featured games: {ex.Message}");
            return new List<Game>();
        }
    }

    private async Task<List<Game>> FetchCategoriesAsync(HttpClient client)
    {
        try
        {
            var response = await client.GetAsync(SteamStorefrontUrl);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            var games = new List<Game>();
            var categories = new[] { "specials", "top_sellers", "new_releases", "coming_soon" };

            foreach (var category in categories)
            {
                if (root.TryGetProperty(category, out var categoryElement) &&
                    categoryElement.TryGetProperty("items", out var itemsElement))
                {
                    foreach (var gameElement in itemsElement.EnumerateArray())
                    {
                        var game = new Game
                        {
                            Id = gameElement.TryGetProperty("id", out var idProp) ? idProp.GetInt32() : 0,
                            Name = gameElement.TryGetProperty("name", out var nameProp) ? nameProp.GetString() ?? "Unknown" : "Unknown",
                            Image = gameElement.TryGetProperty("header_image", out var headerProp) 
                                ? headerProp.GetString() ?? "" 
                                : (gameElement.TryGetProperty("large_capsule_image", out var capsuleProp) 
                                    ? capsuleProp.GetString() ?? "" : ""),
                            Available = true
                        };
                        if (game.Id > 0) games.Add(game);
                    }
                }
            }

            return games;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching categories: {ex.Message}");
            return new List<Game>();
        }
    }
}

