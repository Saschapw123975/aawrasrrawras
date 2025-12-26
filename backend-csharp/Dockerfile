FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["BackendCSharp.csproj", "./"]
RUN dotnet restore "BackendCSharp.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "BackendCSharp.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "BackendCSharp.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy published files
COPY --from=publish /app/publish .

# Copy static files (adjust paths as needed)
# Note: In production, you may want to mount these as volumes
COPY ../index.html /app/wwwroot/
COPY ../web /app/wwwroot/web/

EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "BackendCSharp.dll"]

