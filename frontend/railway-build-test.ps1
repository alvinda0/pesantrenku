# Railway Build Test Script
# This simulates the Railway build process locally

Write-Host "=== Testing Railway Build Process ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean install
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm ci --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Install failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Install successful" -ForegroundColor Green
Write-Host ""

# Step 2: Build
Write-Host "Step 2: Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

# Step 3: Check build output
Write-Host "Step 3: Checking build output..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "✅ dist folder exists (Size: $([math]::Round($distSize, 2)) MB)" -ForegroundColor Green
    
    # List main files
    Write-Host "`nMain files in dist:" -ForegroundColor Cyan
    Get-ChildItem -Path "dist" -File | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ dist folder not found!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Preview test
Write-Host "Step 4: Testing preview server..." -ForegroundColor Yellow
Write-Host "Run this manually: npm run preview -- --host 0.0.0.0 --port 3000" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== All tests passed! Ready for Railway deployment ===" -ForegroundColor Green
