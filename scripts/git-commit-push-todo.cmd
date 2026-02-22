@echo off
REM Commit y push de TODOS los cambios
REM Doble clic para ejecutar, o desde CMD: scripts\git-commit-push-todo.cmd

cd /d "%~dp0.."

echo === Git Add + Commit + Push ===
echo.

echo Añadiendo archivos...
git add -A
if errorlevel 1 (
    echo.
    echo ERROR en git add. Permission denied.
    echo Prueba: Abrir CMD o PowerShell como Administrador, cd a esta carpeta, ejecutar "git add -A"
    pause
    exit /b 1
)

echo.
echo Haciendo commit...
git commit -m "chore: limpieza Furgocasa, SEO un sitio, adaptacion Eco Area Limonar" -m "- Eliminadas referencias Furgocasa" -m "- Páginas legales actualizadas" -m "- SEO un solo sitio Los Nietos/Mar Menor" -m "- Migración vehicle a parcel"
if errorlevel 1 (
    echo ERROR en git commit
    pause
    exit /b 1
)

echo.
echo Haciendo push...
git push
if errorlevel 1 (
    echo ERROR en git push
    pause
    exit /b 1
)

echo.
echo === COMPLETADO ===
pause
