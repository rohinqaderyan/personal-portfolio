# Development Environment Setup Script for Windows PowerShell
# Version: 1.3.2
# This script sets up the development environment for the portfolio project

Write-Host "`n🚀 Portfolio Development Environment Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version
$npmVersion = npm --version

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js $nodeVersion installed" -ForegroundColor Green
    Write-Host "✓ npm $npmVersion installed" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Create .env.local if it doesn't exist
Write-Host "`nSetting up environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✓ Created .env.local from .env.example" -ForegroundColor Green
    } else {
        Write-Host "⚠ .env.example not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "✓ .env.local already exists" -ForegroundColor Green
}

# Run linting and type checks
Write-Host "`nRunning code quality checks..." -ForegroundColor Yellow

Write-Host "  - TypeScript type checking..." -ForegroundColor Cyan
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ TypeScript errors found" -ForegroundColor Yellow
}

Write-Host "  - ESLint linting..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ ESLint warnings found" -ForegroundColor Yellow
}

# Run tests
Write-Host "`nRunning test suite..." -ForegroundColor Yellow
npm run test -- --run
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Some tests failed" -ForegroundColor Yellow
} else {
    Write-Host "✓ All tests passed" -ForegroundColor Green
}

# Show next steps
Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. Edit content files in ./content directory" -ForegroundColor White
Write-Host "  2. Update ./content/site.config.json with your information" -ForegroundColor White
Write-Host "  3. Run 'npm run dev' to start development server" -ForegroundColor White
Write-Host "  4. Visit http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "`nFor more information, see README.md" -ForegroundColor Cyan
Write-Host ""
