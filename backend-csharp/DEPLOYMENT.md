# Crymson Backend - Deployment Guide

## Quick Start

### Development
```bash
cd backend-csharp
run.bat
```

### Publishing

#### Self-Contained (Recommended for Production)
```bash
publish.bat
```
This creates standalone executables for Windows, Linux, and macOS that don't require .NET Runtime.

#### Portable (Requires .NET 8 Runtime)
```bash
publish-portable.bat
```
This creates a portable version that requires .NET 8 Runtime to be installed.

### Running Published Version
```bash
start-published.bat
```

## Manual Publishing

### Windows (Self-Contained)
```bash
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish/win-x64
```

### Linux (Self-Contained)
```bash
dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -o publish/linux-x64
```

### macOS (Self-Contained)
```bash
dotnet publish -c Release -r osx-x64 --self-contained true -p:PublishSingleFile=true -o publish/osx-x64
```

### Portable (Requires .NET Runtime)
```bash
dotnet publish -c Release -o publish-portable
```

## Production Deployment

### Windows Server
1. Run `publish.bat`
2. Copy `publish\win-x64\` folder to server
3. Run `BackendCSharp.exe`
4. Configure Windows Firewall to allow port 5000
5. (Optional) Set up as Windows Service using NSSM or similar

### Linux Server
1. Run `publish.bat` (on Windows) or manually publish for Linux
2. Copy `publish\linux-x64\` folder to server
3. Make executable: `chmod +x BackendCSharp`
4. Run: `./BackendCSharp`
5. (Optional) Set up as systemd service

### Docker Deployment
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["BackendCSharp.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BackendCSharp.dll"]
```

Build and run:
```bash
docker build -t crymson-backend .
docker run -d -p 5000:5000 --name crymson-backend crymson-backend
```

## Configuration

### Environment Variables
- `ASPNETCORE_ENVIRONMENT` - Set to `Production` for production
- `ASPNETCORE_URLS` - Override default URL (default: http://0.0.0.0:5000)

### appsettings.json
- `appsettings.json` - Base configuration
- `appsettings.Development.json` - Development settings
- `appsettings.Production.json` - Production settings

## Requirements

### Development
- .NET 8 SDK

### Production (Self-Contained)
- No additional requirements (includes .NET Runtime)

### Production (Portable)
- .NET 8 Runtime

## Port Configuration

Default port: **5000**

To change the port, modify `Program.cs` or set `ASPNETCORE_URLS` environment variable:
```bash
set ASPNETCORE_URLS=http://0.0.0.0:8080
```

## Performance

- Response compression enabled (GZip & Brotli)
- Memory caching (10 minutes for games)
- Rate limiting (100 requests per 60 seconds per IP)
- HTTP connection pooling
- Static file caching

## Security

- Security headers middleware
- CORS enabled for API endpoints
- Rate limiting on API routes
- Input validation

## Monitoring

Check server logs for:
- API requests
- Errors
- Cache hits/misses
- Rate limit violations

## Troubleshooting

### Port Already in Use
Change the port in `Program.cs` or use environment variable:
```bash
set ASPNETCORE_URLS=http://0.0.0.0:5001
```

### Missing Dependencies
Run `dotnet restore` before publishing.

### Static Files Not Found
Ensure the parent directory structure is correct. The backend expects:
```
website/
  ├── backend-csharp/
  ├── index.html
  ├── web/
  └── ...
```

