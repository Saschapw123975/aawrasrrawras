@echo off
title Crymson Backend (.NET 8)
color 0A
echo.
echo ============================================================
echo   🎮 Crymson Gaming Platform Backend (.NET 8)
echo ============================================================
echo.
echo Starting server...
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

echo [INFO] .NET SDK found
echo [INFO] Restoring dependencies...
dotnet restore

if errorlevel 1 (
    echo [ERROR] Failed to restore dependencies!
    pause
    exit /b 1
)

echo [INFO] Starting server on http://localhost:5000
echo.
echo ============================================================
echo.

dotnet run

pause
