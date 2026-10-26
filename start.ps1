# Multimodal Adaptive Generative AI Tutor - Quick Launcher
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host " MULTIMODAL ADAPTIVE GENERATIVE AI FOR INCLUSIVE LEARNING" -ForegroundColor Green
Write-Host " Final-Year B.Tech CSE (AI/ML) Capstone Project" -ForegroundColor Yellow
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Python
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    Write-Host "[ERROR] Python was not found in PATH! Please install Python 3.10+." -ForegroundColor Red
    pause
    exit 1
}

# 2. Check Node.js
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Host "[ERROR] Node.js was not found in PATH! Please install Node.js." -ForegroundColor Red
    pause
    exit 1
}

Write-Host "[1/3] Environment verified: Python and Node.js detected." -ForegroundColor Green

# 3. Build React Frontend
Write-Host "[2/3] Compiling React frontend with esbuild..." -ForegroundColor Yellow
node frontend/build.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Frontend build failed!" -ForegroundColor Red
    pause
    exit 1
}

# 4. Launch Server & Open Browser
Write-Host "[3/3] Launching server on http://localhost:8000 ..." -ForegroundColor Cyan
Start-Process "http://localhost:8000"

Write-Host "======================================================================" -ForegroundColor Green
Write-Host " Server running! Press Ctrl+C in this terminal to stop." -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Green

python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
