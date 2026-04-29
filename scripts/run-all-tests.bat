@echo off
REM Run all tests with detailed output for Windows

setlocal enabledelayedexpansion

echo.
echo  Running All Tests
echo.

REM Frontend tests
echo ════════════════════════════════════════
echo  Frontend Tests (Jest^)
echo ════════════════════════════════════════
cd apps\web
call npm run test:coverage
if errorlevel 1 echo ⚠️  Frontend tests failed
cd ..\..

REM Backend tests
echo.
echo ════════════════════════════════════════
echo  Backend Tests (Pytest^)
echo ════════════════════════════════════════
cd apps\api
call pytest tests/ -v --cov=app --cov-report=html --cov-report=term-missing
if errorlevel 1 echo ⚠️  Backend tests failed
cd ..\..

echo.
echo Test run complete!
echo.
echo Coverage reports:
echo    - Frontend: open apps\web\coverage\lcov-report\index.html
echo    - Backend: open apps\api\htmlcov\index.html
