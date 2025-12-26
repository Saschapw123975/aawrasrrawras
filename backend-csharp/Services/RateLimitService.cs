using System.Collections.Concurrent;

namespace BackendCSharp.Services;

public class RateLimitService
{
    private readonly ConcurrentDictionary<string, List<DateTime>> _requests = new();
    private const int MaxRequests = 100;
    private const int WindowSeconds = 60;

    public bool IsAllowed(string ipAddress)
    {
        var now = DateTime.UtcNow;
        var windowStart = now.AddSeconds(-WindowSeconds);

        if (!_requests.TryGetValue(ipAddress, out var requestTimes))
        {
            requestTimes = new List<DateTime>();
            _requests[ipAddress] = requestTimes;
        }

        // Clean old entries
        requestTimes.RemoveAll(time => time < windowStart);

        // Check limit
        if (requestTimes.Count >= MaxRequests)
        {
            return false;
        }

        // Add current request
        requestTimes.Add(now);
        return true;
    }
}

