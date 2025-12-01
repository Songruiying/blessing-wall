const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;

// 获取本机IP地址
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                if (iface.address.startsWith('192.168.') || 
                    iface.address.startsWith('10.') || 
                    iface.address.startsWith('172.')) {
                    return iface.address;
                }
            }
        }
    }
    return 'localhost';
}

const LOCAL_IP = getLocalIP();

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // API路由：返回IP地址
    if (req.url === '/api/ip') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ip: LOCAL_IP }), 'utf-8');
        return;
    }

    // 解析URL路径
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // 获取文件扩展名
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // 读取文件
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});


server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 服务器已启动！`);
    console.log(`📱 本地访问: http://localhost:${PORT}`);
    console.log(`🌐 局域网访问: http://${LOCAL_IP}:${PORT}`);
    console.log(`📲 二维码页面: http://${LOCAL_IP}:${PORT}/qrcode.html`);
    console.log(`\n按 Ctrl+C 停止服务器\n`);
});

