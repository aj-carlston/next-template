# Optivo Setup Script
# This script helps you set up a new project from the Optivo template

Write-Host "🎨 Optivo Template Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local already exists
if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Setup cancelled." -ForegroundColor Red
        exit
    }
}

Write-Host "Let's configure your Supabase credentials!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Instructions:" -ForegroundColor Yellow
Write-Host "1. Go to https://supabase.com and create a new project" -ForegroundColor White
Write-Host "2. Navigate to Project Settings → API" -ForegroundColor White
Write-Host "3. Copy your Project URL and anon/public key" -ForegroundColor White
Write-Host ""

# Get Supabase URL
$supabaseUrl = Read-Host "Enter your Supabase Project URL"
if ([string]::IsNullOrWhiteSpace($supabaseUrl)) {
    Write-Host "❌ Supabase URL is required!" -ForegroundColor Red
    exit
}

# Get Supabase Anon Key
$supabaseKey = Read-Host "Enter your Supabase Anon Key"
if ([string]::IsNullOrWhiteSpace($supabaseKey)) {
    Write-Host "❌ Supabase Anon Key is required!" -ForegroundColor Red
    exit
}

# Create .env.local file
$envContent = @"
# Supabase Configuration
# Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host ""
Write-Host "✅ Configuration saved to .env.local" -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Dependencies not installed. Would you like to install them now? (y/n)" -ForegroundColor Yellow
    $install = Read-Host
    if ($install -eq "y") {
        Write-Host "Installing dependencies with pnpm..." -ForegroundColor Cyan
        pnpm install
    }
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create an admin user in Supabase Dashboard → Authentication → Users" -ForegroundColor White
Write-Host "2. Run 'pnpm dev' to start the development server" -ForegroundColor White
Write-Host "3. Navigate to http://localhost:3000 and login!" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
