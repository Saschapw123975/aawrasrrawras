using BackendCSharp.Services;

namespace BackendCSharp.Middleware;

public class RateLimitMiddleware
{
    private readonly RequestDelegate _next;
    private readonly RateLimitService _rateLimitService;

    public RateLimitMiddleware(RequestDelegate next, RateLimitService rateLimitService)
    {
        _next = next;
        _rateLimitService = rateLimitService;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            
            if (!_rateLimitService.IsAllowed(ipAddress))
            {
                context.Response.StatusCode = 429;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"error\":\"Rate limit exceeded\"}");
                return;
            }
        }

        await _next(context);
    }
}

