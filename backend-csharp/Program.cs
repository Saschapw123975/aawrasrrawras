using BackendCSharp.Middleware;
using BackendCSharp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add custom services
builder.Services.AddSingleton<SteamService>();
builder.Services.AddSingleton<CacheService>();
builder.Services.AddSingleton<RateLimitService>();

// Response compression
builder.Services.AddResponseCompression();

var app = builder.Build();

// Configure static files - serve from parent directory
var staticFilesPath = Path.Combine(builder.Environment.ContentRootPath, "..");
var staticFilesOptions = new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(staticFilesPath),
    RequestPath = "",
    OnPrepareResponse = ctx =>
    {
        var path = ctx.File.Name.ToLower();
        if (path.EndsWith(".css") || path.EndsWith(".js") || path.EndsWith(".woff") || path.EndsWith(".woff2"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=31536000");
        }
        else if (path.EndsWith(".html"))
        {
            if (path.Contains("admin"))
            {
                ctx.Context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
            }
            else
            {
                ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=3600");
            }
        }
    }
};

app.UseStaticFiles(staticFilesOptions);

// Serve web folder
var webPath = Path.Combine(builder.Environment.ContentRootPath, "..", "web");
if (Directory.Exists(webPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(webPath),
        RequestPath = "/web",
        OnPrepareResponse = ctx =>
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=86400");
        }
    });
}

// Middleware
app.UseResponseCompression();
app.UseCors("AllowAll");
app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseMiddleware<RateLimitMiddleware>();

// Routing
app.MapControllers();

// Static file routes
app.MapGet("/", async (HttpContext context) =>
{
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", "index.html");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.Headers.Append("Cache-Control", "public, max-age=3600");
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        context.Response.StatusCode = 404;
        await context.Response.WriteAsync("File not found");
    }
});

app.MapGet("/success", async (HttpContext context) =>
{
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", "success.html");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.Headers.Append("Cache-Control", "public, max-age=3600");
        await context.Response.SendFileAsync(filePath);
    }
});

app.MapGet("/cancel", async (HttpContext context) =>
{
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", "cancel.html");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.Headers.Append("Cache-Control", "public, max-age=3600");
        await context.Response.SendFileAsync(filePath);
    }
});

app.MapGet("/admin", async (HttpContext context) =>
{
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", "admin.html");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
        await context.Response.SendFileAsync(filePath);
    }
});

app.MapGet("/payment", async (HttpContext context) =>
{
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", "payment.html");
    if (File.Exists(filePath))
    {
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.Headers.Append("Cache-Control", "public, max-age=3600");
        await context.Response.SendFileAsync(filePath);
    }
});

// Catch-all for SPA routing
app.MapFallback(async (HttpContext context) =>
{
    var path = context.Request.Path.Value?.ToLower() ?? "";
    var filePath = Path.Combine(builder.Environment.ContentRootPath, "..", path.TrimStart('/'));
    
    if (File.Exists(filePath) && (path.EndsWith(".css") || path.EndsWith(".js") || path.EndsWith(".html") || 
        path.EndsWith(".ico") || path.EndsWith(".png") || path.EndsWith(".jpg") || 
        path.EndsWith(".svg") || path.EndsWith(".woff") || path.EndsWith(".woff2")))
    {
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        var indexPath = Path.Combine(builder.Environment.ContentRootPath, "..", "index.html");
        if (File.Exists(indexPath))
        {
            await context.Response.SendFileAsync(indexPath);
        }
    }
});

// Get port from configuration or environment, default to 5000
var port = "5000";
var configUrl = builder.Configuration["Kestrel:Endpoints:Http:Url"];
if (!string.IsNullOrEmpty(configUrl) && configUrl.Contains(":"))
{
    var parts = configUrl.Split(':');
    if (parts.Length > 0)
    {
        port = parts[^1];
    }
}
else
{
    var envUrl = Environment.GetEnvironmentVariable("ASPNETCORE_URLS");
    if (!string.IsNullOrEmpty(envUrl) && envUrl.Contains(":"))
    {
        var parts = envUrl.Split(':');
        if (parts.Length > 0)
        {
            port = parts[^1].Split('/')[0];
        }
    }
}

Console.WriteLine("\n" + "=".PadRight(60, '='));
Console.WriteLine("  🎮 Crymson Gaming Platform (.NET 8)");
Console.WriteLine("  💰 Price: $13.00 (One-Time)");
Console.WriteLine("  ⚡ Optimized & Secured");
Console.WriteLine($"  Server: http://0.0.0.0:{port}");
Console.WriteLine("=".PadRight(60, '=') + "\n");

var url = $"http://0.0.0.0:{port}";
app.Run(url);

