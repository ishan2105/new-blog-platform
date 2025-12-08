#!/usr/bin/env pwsh

# Helper script to run commands with proper PowerShell syntax
# Usage: .\run-commands.ps1

Write-Host "=== Problem 2: Proper npm run dev command ===" -ForegroundColor Green
npm run dev 2>&1 | Select-String -Pattern "Ready|Compiled" | Select-Object -First 1

Write-Host "`n=== Problem 3: Proper npm run build command ===" -ForegroundColor Green
npm run build 2>&1 | Select-String -Pattern "Build|error" | Select-Object -First 3
