@echo off
REM 🚀 Mz. Marianna's Learning Kingdom - Deployment Script (Windows)
REM This script builds and deploys your application to Firebase Hosting

echo ==================================
echo 🏗️  Building Application...
echo ==================================
echo.

call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo ==================================
echo ✅ Build successful!
echo ==================================
echo.

REM Check if firebase CLI is available
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Firebase CLI not found.
    echo 📦 Installing firebase-tools...
    call npm install -g firebase-tools
)

echo ==================================
echo 🚀 Deploying to Firebase Hosting...
echo ==================================
echo.

call firebase deploy --only hosting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==================================
    echo ✅ Deployment Complete!
    echo ==================================
    echo.
    echo 🌍 Your application is live at:
    echo    https://mz-marianna-kingdom-learning.web.app
    echo.
    echo 📊 View in Firebase Console:
    echo    https://console.firebase.google.com/project/mz-marianna-kingdom-learning/hosting
    echo.
) else (
    echo.
    echo ❌ Deployment failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

pause
