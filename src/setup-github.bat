@echo off
REM GitHub Setup Script for Mz. Marianna's Academy (Windows)
REM This script initializes git and pushes to GitHub

echo.
echo ========================================
echo   GitHub Setup - Mz. Marianna's Academy
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if already initialized
if exist .git (
    echo [WARNING] Git repository already exists
    echo.
    set /p continue="Continue anyway? (y/n): "
    if /i not "%continue%"=="y" (
        echo Aborted.
        pause
        exit /b 0
    )
) else (
    echo Initializing git repository...
    git init
    echo.
)

REM Check if .gitignore exists
if not exist .gitignore (
    echo [WARNING] .gitignore not found. Creating one...
    (
        echo node_modules/
        echo .env
        echo .env.local
        echo .DS_Store
        echo dist/
        echo build/
        echo .vercel
        echo *.log
    ) > .gitignore
    echo [OK] Created .gitignore
) else (
    echo [OK] .gitignore exists
)
echo.

REM Add all files
echo Adding all files to git...
git add .
echo.

REM Check git config
for /f "delims=" %%a in ('git config user.name 2^>nul') do set git_name=%%a
if "%git_name%"=="" (
    echo Git user not configured
    set /p git_name="Enter your name: "
    git config user.name "%git_name%"
)

for /f "delims=" %%a in ('git config user.email 2^>nul') do set git_email=%%a
if "%git_email%"=="" (
    set /p git_email="Enter your email: "
    git config user.email "%git_email%"
)

for /f "delims=" %%a in ('git config user.name') do set current_name=%%a
for /f "delims=" %%b in ('git config user.email') do set current_email=%%b
echo [OK] Git configured as: %current_name% ^<%current_email%^>
echo.

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: Complete LMS with portfolio system" -m "Features:" -m "- Role-based authentication (Student, Parent, Admin, Teacher, Tutor, School)" -m "- Student dashboard with quest map, avatar customizer, XP system" -m "- Portfolio system (video recording, image upload, text reflections)" -m "- Parent dashboard with portfolio viewing" -m "- Tutor review queue with feedback system" -m "- Admin dashboard for student management" -m "- Neurodivergent-first design with Calm Mastery principles" -m "- Firebase integration (Auth, Firestore, Storage)" -m "- Responsive design for all devices"
echo.

REM Add remote
echo Adding GitHub remote...
set REPO_URL=https://github.com/Mzmarianna/roblox-learning-hub.git

git remote | findstr "^origin$" >nul 2>&1
if not errorlevel 1 (
    echo [INFO] Remote 'origin' already exists
    for /f "delims=" %%c in ('git remote get-url origin') do set current_url=%%c
    echo Current URL: %current_url%
    echo.
    set /p update="Update to %REPO_URL%? (y/n): "
    if /i "%update%"=="y" (
        git remote set-url origin %REPO_URL%
        echo [OK] Updated remote URL
    )
) else (
    git remote add origin %REPO_URL%
    echo [OK] Added remote: %REPO_URL%
)
echo.

REM Set main branch
echo Setting main branch...
git branch -M main
echo.

REM Push to GitHub
echo ========================================
echo   Ready to push to GitHub!
echo ========================================
echo.
echo Repository: %REPO_URL%
echo.
echo [IMPORTANT] You'll need to authenticate with GitHub
echo If prompted for password, use a Personal Access Token (PAT)
echo Generate one at: https://github.com/settings/tokens
echo.
set /p push="Push now? (y/n): "

if /i "%push%"=="y" (
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo [ERROR] Push failed. Common issues:
        echo   - Need to authenticate (use Personal Access Token)
        echo   - Repository doesn't exist or you don't have access
        echo   - Network connection issue
        echo.
        echo See GITHUB_SETUP.md for troubleshooting
    ) else (
        echo.
        echo ========================================
        echo   SUCCESS! Your code is now on GitHub!
        echo ========================================
        echo.
        echo Next steps:
        echo   1. View your repository: https://github.com/Mzmarianna/roblox-learning-hub
        echo   2. Connect to Vercel: https://vercel.com/new
        echo   3. Add environment variables in Vercel (Firebase config)
        echo.
        echo Documentation:
        echo   - GITHUB_SETUP.md - Complete GitHub guide
        echo   - DEPLOYMENT_GUIDE.md - Vercel deployment
        echo   - PORTFOLIO_SYSTEM_GUIDE.md - Portfolio features
        echo.
    )
) else (
    echo.
    echo Skipped push. When ready, run:
    echo   git push -u origin main
)

echo.
echo Setup complete!
echo.
pause
