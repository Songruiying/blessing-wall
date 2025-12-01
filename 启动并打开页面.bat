@echo off
chcp 65001 >nul
title 启动服务器并打开页面

echo ====================================
echo   启动本地服务器并打开页面
echo ====================================
echo.

REM 检查服务器是否已运行
echo 正在检查服务器状态...
powershell -Command "try { $resp = Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing -TimeoutSec 2; Write-Output 'running' } catch { Write-Output 'not-running' }" > temp_status.txt
set /p SERVER_STATUS=<temp_status.txt
del temp_status.txt

if "%SERVER_STATUS%"=="running" (
    echo ✅ 服务器已在运行
) else (
    echo ⏳ 正在启动服务器...
    start "服务器" powershell -NoExit -Command "cd 'D:\project\Check-in code'; Write-Host '🚀 服务器启动中...' -ForegroundColor Green; node server.js"
    echo 等待服务器启动...
    timeout /t 3 /nobreak >nul
)

echo.
echo 正在打开页面...
timeout /t 1 /nobreak >nul

REM 打开各个页面
start http://localhost:3000/wall-with-qr.html
timeout /t 1 /nobreak >nul

start http://localhost:3000/lottery.html

echo.
echo ====================================
echo   ✅ 页面已打开！
echo ====================================
echo.
echo 📺 大屏页面: http://localhost:3000/wall-with-qr.html
echo 🎁 抽奖页面: http://localhost:3000/lottery.html
echo.
echo 注意：服务器窗口不要关闭！
echo.
pause

