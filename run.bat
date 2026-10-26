@echo off
title Multimodal Adaptive AI Tutor - Capstone Project
color 0A
echo ======================================================================
echo  MULTIMODAL ADAPTIVE GENERATIVE AI FOR INCLUSIVE LEARNING
echo  Final-Year B.Tech CSE (AI/ML) Capstone Project
echo ======================================================================
echo.
echo [1/3] Checking prerequisites...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b 1
)

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    pause
    exit /b 1
)
echo      Python and Node.js detected.
echo.

echo [2/3] Building frontend bundle (esbuild)...
call node frontend/build.js
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)
echo.

echo [3/3] Launching Inclusive AI Tutor Server on http://localhost:8000 ...
echo      Opening default browser...
start http://localhost:8000
echo.
echo ======================================================================
echo Server is running! Press Ctrl+C in this window to stop the server.
echo ======================================================================
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
pause
