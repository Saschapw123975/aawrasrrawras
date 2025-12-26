using Microsoft.Extensions.Caching.Memory;

namespace BackendCSharp.Services;

public class CacheService
{
    private readonly IMemoryCache _cache;
    private const int GamesCacheMinutes = 10;

    public CacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public T? Get<T>(string key) where T : class
    {
        return _cache.Get<T>(key);
    }

    public void Set<T>(string key, T value, int minutes = GamesCacheMinutes)
    {
        var options = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(minutes)
        };
        _cache.Set(key, value, options);
    }

    public bool TryGetValue<T>(string key, out T? value) where T : class
    {
        return _cache.TryGetValue(key, out value);
    }
}

