# Crymson Backend (.NET 8)

C# .NET 8 backend for the Crymson gaming platform.

## Features

- ✅ All API endpoints from Python Flask version
- ✅ Steam API integration
- ✅ Rate limiting
- ✅ CORS support
- ✅ Response compression
- ✅ Static file serving
- ✅ Security headers
- ✅ Caching

## Quick Start

### Development
```bash
cd backend-csharp
run.bat
```

### Publishing
```bash
publish.bat          # Self-contained (Windows, Linux, macOS)
publish-portable.bat  # Portable (requires .NET Runtime)
```

### Running Published Version
```bash
start-published.bat
```

## Setup

1. Install .NET 8 SDK: https://dotnet.microsoft.com/download/dotnet/8.0

2. Navigate to the backend-csharp directory:
   ```bash
   cd backend-csharp
   ```

3. Run the application:
   ```bash
   run.bat
   ```
   
   Or manually:
   ```bash
   dotnet restore
   dotnet run
   ```

The server will start on `http://localhost:5000`

## Batch Files

- **run.bat** - Run in development mode
- **publish.bat** - Create self-contained executables for all platforms
- **publish-portable.bat** - Create portable version (requires .NET Runtime)
- **start-published.bat** - Start the published version

## API Endpoints

- `GET /api/games` - Get paginated games (page, limit query params)
- `GET /api/stats` - Get platform statistics
- `GET /api/stats/online` - Get online user count
- `GET /api/pricing` - Get pricing information
- `GET /api/pricing/checkout` - Get checkout URL
- `GET /api/features` - Get features list
- `GET /api/faq` - Get FAQ data

## Static Routes

- `/` - index.html
- `/success` - success.html
- `/cancel` - cancel.html
- `/admin` - admin.html
- `/preview` - preview.html
- `/payment` - payment.html
- `/web/*` - Files from web folder

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including:
- Production deployment
- Docker deployment
- Windows/Linux/macOS publishing
- Configuration
- Troubleshooting

