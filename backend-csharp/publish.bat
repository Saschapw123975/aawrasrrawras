@echo off
title Crymson Backend - Publish
color 0B
echo.
echo ============================================================
echo   📦 Publishing Crymson Backend (.NET 8)
echo ============================================================
echo.

cd /d "%~dp0"

REM Check if .NET 8 is installed
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] .NET 8 SDK is not installed!
    echo.
    echo Please install .NET 8 SDK from:
    echo https://dotnet.microsoft.com/download/dotnet/8.0
    echo.
    pause
    exit /b 1
)

echo [INFO] Cleaning previous builds...
if exist "publish" rmdir /s /q "publish"
if exist "bin" rmdir /s /q "bin"
if exist "obj" rmdir /s /q "obj"

echo [INFO] Restoring dependencies...
dotnet restore

if errorlevel 1 (
    echo [ERROR] Failed to restore dependencies!
    pause
    exit /b 1
)

echo.
echo [INFO] Publishing for Windows x64 (Self-Contained)...
echo.

dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o "publish\win-x64"

if errorlevel 1 (
    echo [ERROR] Failed to publish!
    pause
    exit /b 1
)

echo.
echo [INFO] Publishing for Linux x64 (Self-Contained)...
echo.

dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o "publish\linux-x64"

if errorlevel 1 (
    echo [WARNING] Linux publish failed, continuing...
)

echo.
echo [INFO] Publishing for macOS x64 (Self-Contained)...
echo.

dotnet publish -c Release -r osx-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -o "publish\osx-x64"

if errorlevel 1 (
    echo [WARNING] macOS publish failed, continuing...
)

echo.
echo ============================================================
echo   ✅ Publishing Complete!
echo ============================================================
echo.
echo Published files are in the 'publish' folder:
echo   - publish\win-x64\BackendCSharp.exe (Windows)
echo   - publish\linux-x64\BackendCSharp (Linux)
echo   - publish\osx-x64\BackendCSharp (macOS)
echo.
echo To run the published version:
echo   Windows: publish\win-x64\BackendCSharp.exe
echo   Linux:   ./publish/linux-x64/BackendCSharp
echo   macOS:   ./publish/osx-x64/BackendCSharp
echo.
pause

