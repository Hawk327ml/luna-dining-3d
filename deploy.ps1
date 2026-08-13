# Safe deploy — Luna Dining only (never bare firebase deploy)
# Requires: firebase login, site luna-dining-3d already created
#
# Node/Firebase CLI needs explicit proxy on Hawk Windows + v2rayN.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not $env:HTTP_PROXY) { $env:HTTP_PROXY = "http://127.0.0.1:10808" }
if (-not $env:HTTPS_PROXY) { $env:HTTPS_PROXY = "http://127.0.0.1:10808" }
$env:NODE_USE_ENV_PROXY = "1"
Write-Host "== Node proxy for Firebase CLI ==" -ForegroundColor Cyan
Write-Host "HTTP_PROXY=$($env:HTTP_PROXY)"

Write-Host "== Verify target binding ==" -ForegroundColor Cyan
Get-Content .firebaserc
$firebaseJson = Get-Content firebase.json -Raw
if ($firebaseJson -notmatch '"target"\s*:\s*"luna"') {
  throw "firebase.json missing hosting.target luna — aborting to protect other sites."
}

Write-Host "== Build ==" -ForegroundColor Cyan
npm run build

Write-Host "== Deploy hosting:luna only ==" -ForegroundColor Cyan
firebase deploy --only hosting:luna --project daisy-c2db8

Write-Host "== Spot-check URLs (open manually) ==" -ForegroundColor Yellow
Write-Host "https://luna-dining-3d.web.app"
Write-Host "https://rosemary-care-notebook.web.app"
Write-Host "https://focusspace-3d.web.app"
