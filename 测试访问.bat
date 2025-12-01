@echo off
chcp 65001 >nul
echo ====================================
echo   测试服务器访问
echo ====================================
echo.

echo 正在测试本地访问...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 本地服务器运行正常
) else (
    echo ❌ 本地服务器无响应，请先启动服务器
    pause
    exit /b
)

echo.
echo 正在获取局域网IP...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    set ip=!ip:~1!
    echo 找到IP: !ip!
    echo.
    echo ====================================
    echo   访问地址
    echo ====================================
    echo 本地访问: http://localhost:3000
    echo 局域网访问: http://!ip!:3000
    echo.
    echo 二维码页面: http://!ip!:3000/qrcode.html
    echo 签到页面: http://!ip!:3000/index.html
    echo 祝福墙: http://!ip!:3000/wall.html
    echo 抽奖页面: http://!ip!:3000/lottery.html
    echo.
    echo ====================================
    echo.
    echo 按任意键在浏览器中打开二维码页面...
    pause >nul
    start http://!ip!:3000/qrcode.html
    goto :end
)
:end
pause

