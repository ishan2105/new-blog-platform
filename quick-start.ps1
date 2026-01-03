# 🚀 Interactive Blog Platform - Quick Start (PowerShell)

Write-Host "╔═══════════════════════════════════════════════════════════════════╗" -ForegroundColor White
Write-Host "║  🚀 Interactive Blog Platform - Quick Start                        ║" -ForegroundColor White
Write-Host "║  Merged: Personal Blog Platform + My CRUD App                      ║" -ForegroundColor White
Write-Host "╚═══════════════════════════════════════════════════════════════════╝" -ForegroundColor White
Write-Host ""

# Check if Node.js is installed
Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "[2/5] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm -v
    Write-Host "✓ npm $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed." -ForegroundColor Red
    exit 1
}

# Check if .env.local exists
Write-Host "[3/5] Checking environment file..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create .env.local file with:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host 'DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/blog_db"'
    Write-Host 'JWT_SECRET="your-secret-key"'
    Write-Host ""
    Read-Host "Press Enter after creating .env.local"
} else {
    Write-Host "✓ .env.local found" -ForegroundColor Green
}

# Install dependencies
Write-Host "[4/5] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Setup database
Write-Host "[5/5] Setting up database..." -ForegroundColor Yellow
npx prisma db push --skip-generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Database setup had issues. Make sure MongoDB is accessible." -ForegroundColor Yellow
} else {
    Write-Host "✓ Database ready" -ForegroundColor Green
}

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════════════╗" -ForegroundColor White
Write-Host "║ ✓ Setup Complete!                                                 ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════════════╝" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to start!" -ForegroundColor Green
Write-Host ""
Write-Host "Start development server with:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then open:" -ForegroundColor White
Write-Host "  http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor White
Write-Host "  SETUP_GUIDE.md" -ForegroundColor Yellow
Write-Host "  MERGE_SUMMARY.md" -ForegroundColor Yellow
Write-Host ""
