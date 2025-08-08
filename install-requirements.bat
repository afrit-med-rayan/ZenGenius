@echo off
echo ========================================
echo    ZenGenius - Installation Script
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [4/4] Installation complete!
cd ..

echo.
echo ========================================
echo    Installation Successful! 
echo ========================================
echo.
echo Next steps:
echo 1. Configure your .env files (see README.md)
echo 2. Run: npm run dev
echo.
pause