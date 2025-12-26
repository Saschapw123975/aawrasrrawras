@echo off
title Crymson Backend - Publish (Portable)
color 0C
echo.
echo ============================================================
echo   📦 Publishing Crymson Backend (Portable)
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
if exist "publish-portable" rmdir /s /q "publish-portable"
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
echo [INFO] Publishing portable version (requires .NET 8 Runtime)...
echo.

dotnet publish -c Release -o "publish-portable"

if errorlevel 1 (
    echo [ERROR] Failed to publish!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   ✅ Publishing Complete!
echo ============================================================
echo.
echo Published files are in the 'publish-portable' folder.
echo.
echo This version requires .NET 8 Runtime to be installed.
echo To run: dotnet publish-portable\BackendCSharp.dll
echo.
pause

