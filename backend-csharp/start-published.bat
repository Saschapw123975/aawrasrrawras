@echo off
title Crymson Backend - Start Published
color 0E
echo.
echo ============================================================
echo   🚀 Starting Published Crymson Backend
echo ============================================================
echo.

cd /d "%~dp0"

REM Check for published Windows version first
if exist "publish\win-x64\BackendCSharp.exe" (
    echo [INFO] Found Windows published version
    echo [INFO] Starting server on http://localhost:5000
    echo.
    echo ============================================================
    echo.
    start "Crymson Backend" "publish\win-x64\BackendCSharp.exe"
    echo Server started in new window.
    echo.
    pause
    exit /b 0
)

REM Check for portable version
if exist "publish-portable\BackendCSharp.dll" (
    echo [INFO] Found portable version
    echo [INFO] Starting server on http://localhost:5000
    echo.
    echo ============================================================
    echo.
    dotnet "publish-portable\BackendCSharp.dll"
    pause
    exit /b 0
)

echo [ERROR] No published version found!
echo.
echo Please run publish.bat or publish-portable.bat first.
echo.
pause
exit /b 1

