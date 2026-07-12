@echo off
setlocal

set "APP_DIR=%~dp0"
set "APP_URL=http://localhost:3010"

if not exist "%APP_DIR%\package.json" (
    echo Could not find the Next.js app folder:
    echo %APP_DIR%
    pause
    exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed or not available in PATH.
    echo Install Node.js from https://nodejs.org, then run this file again.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo npm is not available in PATH.
    echo Reinstall Node.js from https://nodejs.org, then run this file again.
    pause
    exit /b 1
)

echo Starting RecipeBook...
echo.
echo A black server window will open now.
echo Keep that server window open while using the website.
echo.
echo Main link: %APP_URL%
echo.
echo If port 3010 is busy, close the other app using it and run this file again.
echo.

start "RecipeBook Local Server" cmd /k "cd /d ""%APP_DIR%"" && if not exist "".next\BUILD_ID"" npm run build && npm run start -- -p 3010"

echo Waiting for RecipeBook to start...
echo.

for /l %%i in (1,1,60) do (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri '%APP_URL%' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -ge 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>nul
    if not errorlevel 1 goto ready
    timeout /t 2 /nobreak >nul
)

echo RecipeBook did not start within 2 minutes.
echo.
pause
exit /b 1

:ready
start "" "%APP_URL%"
echo Browser opened at %APP_URL%
echo You can close this window.
pause
