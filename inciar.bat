@echo off
echo ================================
echo   Iniciando Event Manager...
echo ================================

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Desktop no esta corriendo.
    echo Abri Docker Desktop y esperá que cargue, luego ejecutá este archivo de nuevo.
    pause
    exit /b 1
)

docker compose up -d --build

echo.
echo Esperando que los servicios arranquen...
timeout /t 8 /nobreak >nul

echo.
echo ================================
echo  Abriendo la aplicacion...
echo ================================
start http://localhost:4000

pause