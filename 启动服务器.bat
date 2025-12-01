@echo off
chcp 65001 >nul
echo ========================================
echo   祝福墙签到系统 - 服务器启动
echo ========================================
echo.
cd /d "%~dp0"
echo 正在启动服务器...
echo.
node server.js
pause

