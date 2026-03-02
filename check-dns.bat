@echo off
echo ================================================
echo    GitHub Pages DNS Checker - vck2910.id.vn
echo ================================================
echo.

echo [1] Checking root domain (vck2910.id.vn)...
echo ------------------------------------------------
nslookup vck2910.id.vn
echo.
echo Expected IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
echo.
echo.

echo [2] Checking www subdomain (www.vck2910.id.vn)...
echo ------------------------------------------------
nslookup www.vck2910.id.vn
echo.
echo Expected: CNAME pointing to vck2910.github.io
echo.
echo.

echo [3] Testing connection to domain...
echo ------------------------------------------------
ping -n 4 vck2910.id.vn
echo.
echo.

echo [4] Checking if GitHub Pages is accessible...
echo ------------------------------------------------
curl -I https://vck2910.github.io 2>nul
if %errorlevel% equ 0 (
    echo ✓ GitHub Pages is accessible
) else (
    echo ✗ Cannot reach GitHub Pages
)
echo.
echo.

echo ================================================
echo    Results Summary
echo ================================================
echo.
echo If you see 185.199.xxx.xxx in step 1: ✓ DNS is correct
echo If you see "can't find" or wrong IP: ✗ DNS needs fixing
echo.
echo Next steps:
echo - If DNS correct but GitHub shows error: Wait 30 mins
echo - If DNS wrong: Check zonedns.vn records
echo - Use: https://whatsmydns.net to check propagation
echo.
echo ================================================
pause
