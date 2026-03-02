# GitHub Pages DNS Diagnostic Tool
# Run this to check if your DNS is configured correctly

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   GitHub Pages DNS Checker - vck2910.id.vn" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

$domain = "vck2910.id.vn"
$wwwDomain = "www.vck2910.id.vn"
$githubIPs = @("185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153")
$githubRepo = "vck2910.github.io"

# Function to check DNS
function Test-DNS {
    param($Domain, $ExpectedType)
    
    try {
        $result = Resolve-DnsName -Name $Domain -ErrorAction Stop
        return $result
    } catch {
        return $null
    }
}

# Check 1: Root domain A records
Write-Host "[1] Checking root domain ($domain)..." -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Gray
$rootDNS = Test-DNS -Domain $domain -ExpectedType "A"

if ($rootDNS) {
    $foundIPs = $rootDNS | Where-Object { $_.Type -eq "A" } | Select-Object -ExpandProperty IPAddress
    
    Write-Host "Found IPs:" -ForegroundColor White
    foreach ($ip in $foundIPs) {
        if ($githubIPs -contains $ip) {
            Write-Host "  ✓ $ip (Correct - GitHub Pages)" -ForegroundColor Green
        } else {
            Write-Host "  ✗ $ip (Wrong - Not GitHub Pages)" -ForegroundColor Red
        }
    }
    
    # Check if all GitHub IPs are present
    $missingIPs = $githubIPs | Where-Object { $foundIPs -notcontains $_ }
    if ($missingIPs.Count -eq 0) {
        Write-Host "`n✓ All GitHub Pages IPs configured correctly!" -ForegroundColor Green
    } else {
        Write-Host "`n⚠ Missing IPs:" -ForegroundColor Yellow
        foreach ($ip in $missingIPs) {
            Write-Host "  - $ip" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "✗ DNS not found or not resolving!" -ForegroundColor Red
    Write-Host "  → Check your DNS records at zonedns.vn" -ForegroundColor Yellow
}

Write-Host "`n"

# Check 2: www CNAME
Write-Host "[2] Checking www subdomain ($wwwDomain)..." -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Gray
$wwwDNS = Test-DNS -Domain $wwwDomain -ExpectedType "CNAME"

if ($wwwDNS) {
    $cname = $wwwDNS | Where-Object { $_.Type -eq "CNAME" } | Select-Object -ExpandProperty NameHost
    
    if ($cname) {
        Write-Host "Found CNAME: $cname" -ForegroundColor White
        if ($cname -like "*$githubRepo*") {
            Write-Host "✓ CNAME correctly points to $githubRepo" -ForegroundColor Green
        } else {
            Write-Host "✗ CNAME points to wrong target" -ForegroundColor Red
            Write-Host "  Expected: $githubRepo" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "✗ www CNAME not found!" -ForegroundColor Red
    Write-Host "  → Add CNAME record: www → $githubRepo" -ForegroundColor Yellow
}

Write-Host "`n"

# Check 3: GitHub Pages accessibility
Write-Host "[3] Checking GitHub Pages site..." -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "https://$githubRepo" -Method Head -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ GitHub Pages site is accessible" -ForegroundColor Green
    Write-Host "  Status: $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Cannot reach GitHub Pages site" -ForegroundColor Red
    Write-Host "  → Make sure your repo is public and Pages is enabled" -ForegroundColor Yellow
}

Write-Host "`n"

# Check 4: Test custom domain
Write-Host "[4] Testing custom domain (https://$domain)..." -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri "https://$domain" -Method Head -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
    Write-Host "✓ Custom domain is working!" -ForegroundColor Green
    Write-Host "  Status: $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Custom domain not accessible yet" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
    Write-Host "  → DNS might still be propagating. Wait 30-60 minutes." -ForegroundColor Yellow
}

Write-Host "`n"

# Summary
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   SUMMARY & NEXT STEPS" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Determine status
$dnsOK = $rootDNS -and ($rootDNS | Where-Object { $githubIPs -contains $_.IPAddress }).Count -gt 0
$cnameOK = $wwwDNS -and ($wwwDNS.NameHost -like "*$githubRepo*")

if ($dnsOK -and $cnameOK) {
    Write-Host "✓ DNS Configuration: CORRECT" -ForegroundColor Green
    Write-Host "`nYour DNS is configured correctly!" -ForegroundColor Green
    Write-Host "If GitHub still shows error, wait 30-60 minutes for propagation." -ForegroundColor Yellow
    Write-Host "`nSteps:" -ForegroundColor White
    Write-Host "1. Wait for DNS to propagate globally" -ForegroundColor Gray
    Write-Host "2. Check status: https://whatsmydns.net" -ForegroundColor Gray
    Write-Host "3. In GitHub Settings → Pages, click 'Check again'" -ForegroundColor Gray
    Write-Host "4. When verified, enable 'Enforce HTTPS'" -ForegroundColor Gray
} else {
    Write-Host "✗ DNS Configuration: NEEDS FIXING" -ForegroundColor Red
    Write-Host "`nAction required at zonedns.vn:" -ForegroundColor Yellow
    
    if (-not $dnsOK) {
        Write-Host "`n→ Fix A Records:" -ForegroundColor Yellow
        Write-Host "  Delete old A records (if any)" -ForegroundColor Gray
        Write-Host "  Add these 4 A records:" -ForegroundColor Gray
        foreach ($ip in $githubIPs) {
            Write-Host "    Type: A | Host: @ | Value: $ip | TTL: 3600" -ForegroundColor White
        }
    }
    
    if (-not $cnameOK) {
        Write-Host "`n→ Fix CNAME Record:" -ForegroundColor Yellow
        Write-Host "  Type: CNAME | Host: www | Value: $githubRepo | TTL: 3600" -ForegroundColor White
    }
}

Write-Host "`n================================================`n" -ForegroundColor Cyan

# Offer to check propagation online
Write-Host "Want to check DNS propagation worldwide?" -ForegroundColor Cyan
Write-Host "Press 'Y' to open whatsmydns.net, or any key to exit..." -ForegroundColor Gray
$key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
if ($key.Character -eq 'y' -or $key.Character -eq 'Y') {
    Start-Process "https://www.whatsmydns.net/#A/$domain"
}

Write-Host "`nDone! Re-run this script anytime to recheck." -ForegroundColor Green
Write-Host ""
