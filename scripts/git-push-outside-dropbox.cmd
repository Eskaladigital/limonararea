@echo off
REM Primer push a GitHub cuando "git add" falla con Permission denied (proyecto en Dropbox).
REM Copia el proyecto a una carpeta temporal fuera de Dropbox, hace commit y push, luego actualiza el .git en origen.
setlocal

set "ORIGIN=%~dp0.."
set "DEST=%USERPROFILE%\limonar-push-temp"
set "REPO=https://github.com/Eskaladigital/limonararea.git"

echo Copiando proyecto a %DEST% (excluyendo .git, node_modules, .next)...
if exist "%DEST%" rd /s /q "%DEST%"
mkdir "%DEST%"
robocopy "%ORIGIN%" "%DEST%" /E /XD .git node_modules .next .cursor /NFL /NDL /NJH /NJS
if errorlevel 8 (
  echo Error al copiar. Comprueba rutas.
  pause
  exit /b 1
)

echo.
echo Inicializando Git y haciendo push...
cd /d "%DEST%"
git init
git add .
git commit -m "Initial commit - Eco Area Limonar"
git remote add origin "%REPO%"
git branch -M master
git push -u origin master

if errorlevel 1 (
  echo.
  echo Push fallido. Comprueba que tienes acceso a GitHub y que el repo existe.
  pause
  exit /b 1
)

echo.
echo Copiando .git de vuelta al proyecto en Dropbox...
if exist "%ORIGIN%.git" rd /s /q "%ORIGIN%.git"
xcopy "%DEST%\.git\*" "%ORIGIN%.git\" /E /I /H /Y
echo.
echo Listo. Puedes borrar la carpeta temporal: %DEST%
pause
