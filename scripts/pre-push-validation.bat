@echo off
REM Pre-push validation script for Windows

setlocal enabledelayedexpansion

echo.
echo Running pre-push validation...
echo.

REM Check types
echo Checking types...
call npm run check-types
if errorlevel 1 exit /b 1

REM Run linting
echo Running linters...
call npm run lint
if errorlevel 1 exit /b 1

REM Run tests
echo Running tests...
call npm run test
if errorlevel 1 exit /b 1

echo.
echo All pre-push checks passed!
