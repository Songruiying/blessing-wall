@echo off
chcp 65001 >nul
title 打开二维码页面

echo.
echo ====================================
echo   祝福墙签到系统 - 二维码页面
echo ====================================
echo.

REM 获取局域网IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i /c:"IPv4"') do (
    set "ip=%%a"
    set "ip=!ip:~1!"
    echo 检测到IP地址: !ip!
    echo.
    echo 正在打开二维码页面...
    echo 地址: http://!ip!:3000/qrcode.html
    echo.
    start http://!ip!:3000/qrcode.html
    goto :found
)

:found
echo 如果无法打开，请尝试：
echo 1. 检查服务器是否运行
echo 2. 检查防火墙设置
echo 3. 使用本地地址: http://localhost:3000/qrcode.html
echo.
pause

