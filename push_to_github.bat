@echo off
echo ===================================================
echo   LoveFlix Automatic Git Push Script
echo ===================================================
echo.
cd /d "%~dp0"

echo 1. Staging files...
git add .

echo 2. Committing changes...
git commit -m "feat: update LoveFlix platforms, soundtracks, and scrollable categories"

echo 3. Setting remote repository to https://github.com/ankitparida925-afk/s.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/ankitparida925-afk/s.git
git branch -M main

echo 4. Pushing code to GitHub (main branch)...
git push -u origin main

echo.
echo ===================================================
echo   Done! Your code has been pushed to GitHub.
echo ===================================================
pause
