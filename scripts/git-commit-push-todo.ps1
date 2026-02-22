# Script para hacer commit y push de TODOS los cambios
# Ejecutar: Clic derecho -> "Ejecutar con PowerShell"
# O desde PowerShell: .\scripts\git-commit-push-todo.ps1

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $projectRoot

Write-Host "=== Git Add + Commit + Push ===" -ForegroundColor Cyan
Write-Host "Directorio: $projectRoot" -ForegroundColor Gray
Write-Host ""

# Add todo
Write-Host "Añadiendo archivos..." -ForegroundColor Yellow
git add -A
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR en git add. Prueba:" -ForegroundColor Red
    Write-Host "  1. Cerrar Cursor" -ForegroundColor White
    Write-Host "  2. Abrir PowerShell como Administrador" -ForegroundColor White
    Write-Host "  3. cd '$projectRoot'" -ForegroundColor White
    Write-Host "  4. git add -A" -ForegroundColor White
    exit 1
}

# Status
$staged = git diff --cached --name-only
$count = ($staged | Measure-Object -Line).Lines
Write-Host "Archivos en staging: $count" -ForegroundColor Green

# Commit
$msg = @"
chore: limpieza Furgocasa, SEO un sitio, adaptación Eco Area Limonar

- Eliminadas todas las referencias a Furgocasa en docs, código y traducciones
- Actualizadas páginas legales (privacidad, aviso legal) ES/EN/FR/DE/NL
- Adaptado SEO: un solo sitio (Los Nietos/Mar Menor), no landing por ciudad
- NORMAS-SEO, SEO-LOCAL-OPENGRAPH, SEO-LANDING-HOME adaptados
- Schema Campground en lugar de LocalBusiness multi-ubicación
- Migración vehicle->parcel, scripts y migraciones SQL
"@

Write-Host ""
Write-Host "Haciendo commit..." -ForegroundColor Yellow
git commit -m $msg
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR en git commit" -ForegroundColor Red
    exit 1
}

# Push
Write-Host ""
Write-Host "Haciendo push..." -ForegroundColor Yellow
git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR en git push. Comprueba remoto y credenciales." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== COMPLETADO ===" -ForegroundColor Green
Write-Host "Pulsa una tecla para cerrar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
