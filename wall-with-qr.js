// ===== 二维码部分 =====
function getSignInUrl(callback) {
    // 二维码指向签到页面
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    
    // 如果是公网域名（不是localhost和IP地址），直接使用
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        // 公网域名（如 vercel.app, github.io 等）
        const url = `${protocol}//${hostname}${port}/index.html`;
        if (callback) callback(url);
        return url;
    }
    
    // 如果已经是IP地址（局域网），直接使用
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        const url = `${protocol}//${hostname}${port}/index.html`;
        if (callback) callback(url);
        return url;
    }
    
    // 如果是localhost，尝试获取局域网IP
    fetch('/api/ip')
        .then(res => res.json())
        .then(data => {
            if (data.ip && data.ip !== 'localhost' && data.ip !== '127.0.0.1') {
                // 使用局域网IP
                const url = `${protocol}//${data.ip}${port}/index.html`;
                if (callback) callback(url);
                return url;
            } else {
                // 如果获取失败，使用当前地址（但这对手机扫码无效）
                console.warn('无法获取局域网IP，二维码可能无法在手机上使用');
                const url = `${protocol}//${hostname}${port}/index.html`;
                if (callback) callback(url);
                return url;
            }
        })
        .catch(() => {
            // 如果获取失败，使用当前地址
            console.warn('获取IP失败，二维码可能无法在手机上使用');
            const url = `${protocol}//${hostname}${port}/index.html`;
            if (callback) callback(url);
            return url;
        });
    
    // 临时返回localhost（会在回调中更新）
    return `${protocol}//${hostname}${port}/index.html`;
}

function updateQRCode(url) {
    const container = document.getElementById('qrcode');
    if (!container) return;
    
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    img.alt = '扫码签到';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.maxWidth = '300px';
    container.innerHTML = '';
    container.appendChild(img);
    
    console.log('二维码已更新，URL:', url);
}

function renderQRCode() {
    // 使用回调确保获取到正确的IP后再生成二维码
    getSignInUrl((url) => {
        updateQRCode(url);
    });
}

// ===== 祝福墙部分：复用原逻辑 =====
function getBlessings() {
    return JSON.parse(localStorage.getItem('blessings') || '[]');
}

function createEnvelope(blessing) {
    const envelope = document.createElement('div');
    envelope.className = `envelope ${blessing.group} new`;
    envelope.dataset.id = blessing.id;

    const body = document.createElement('div');
    body.className = 'envelope-body';

    const content = document.createElement('div');
    content.className = 'envelope-content';

    const name = document.createElement('div');
    name.className = 'envelope-name';
    name.textContent = blessing.name;

    const blessingText = document.createElement('div');
    blessingText.className = 'envelope-blessing';
    blessingText.textContent = blessing.blessing;

    content.appendChild(name);
    content.appendChild(blessingText);
    body.appendChild(content);
    envelope.appendChild(body);

    return envelope;
}

function getRandomPosition() {
    const wall = document.getElementById('wall');
    const wallHeight = wall.clientHeight;

    // 从右边开始，随机垂直位置
    return {
        left: '100%',  // 从屏幕右侧开始
        top: Math.random() * (wallHeight - 200) + 100 + 'px'
    };
}

function addEnvelopeToWall(blessing) {
    const wall = document.getElementById('wall');
    const envelope = createEnvelope(blessing);
    const position = getRandomPosition();

    envelope.style.left = position.left;
    envelope.style.top = position.top;

    wall.appendChild(envelope);

    // 动画结束后移除元素（12秒后）
    setTimeout(() => {
        envelope.remove();
    }, 12000);
}

function updateStats() {
    const blessings = getBlessings();
    const studentCount = blessings.filter(b => b.group === 'student').length;
    const teacherCount = blessings.filter(b => b.group === 'teacher').length;

    document.getElementById('totalCount').textContent = blessings.length;
    document.getElementById('studentCount').textContent = studentCount;
    document.getElementById('teacherCount').textContent = teacherCount;
}

// 创建多条飘动提示文字
function createFloatingTips() {
    const wall = document.getElementById('wall');
    const wallHeight = wall.clientHeight;
    const tipText = '请大家留下对分院，老师，和同学的祝福吧';
    
    // 创建3-5条提示文字，分布在不同的垂直位置
    const tipCount = 4;
    const tips = [];
    
    for (let i = 0; i < tipCount; i++) {
        const tip = document.createElement('div');
        tip.className = 'floating-tip';
        tip.textContent = tipText;
        
        // 随机垂直位置（分布在屏幕的不同高度）
        const topPercent = 20 + (i * 20) + Math.random() * 10; // 20%, 40%, 60%, 80% 附近
        tip.style.top = `${topPercent}%`;
        
        // 每条提示有不同的动画延迟，形成错落有致的效果
        tip.style.animationDelay = `${i * 3}s`;
        
        wall.appendChild(tip);
        tips.push(tip);
    }
    
    return tips;
}

function initWall() {
    const wall = document.getElementById('wall');
    wall.innerHTML = '';

    const blessings = getBlessings();
    
    // 如果没有祝福，创建多条飘动提示文字
    if (blessings.length === 0) {
        createFloatingTips();
    }

    blessings.forEach((blessing, index) => {
        setTimeout(() => {
            addEnvelopeToWall(blessing);
        }, index * 200);
    });

    updateStats();
}

// 监听本地数据变化（其他页面提交祝福时）
window.addEventListener('storage', e => {
    if (e.key === 'blessings') {
        initWall();
    }
});

let lastBlessingCount = 0;
setInterval(() => {
    const blessings = getBlessings();
    if (blessings.length > lastBlessingCount) {
        const newBlessings = blessings.slice(lastBlessingCount);
        newBlessings.forEach(blessing => {
            addEnvelopeToWall(blessing);
        });
        updateStats();
        lastBlessingCount = blessings.length;
        
        // 有祝福后移除所有提示文字
        const wall = document.getElementById('wall');
        const tips = wall.querySelectorAll('.floating-tip');
        if (tips.length > 0 && blessings.length > 0) {
            tips.forEach(tip => tip.remove());
        }
    } else if (blessings.length === 0 && lastBlessingCount > 0) {
        // 如果祝福被清空，重新创建提示文字
        lastBlessingCount = 0;
        initWall();
    }
}, 1000);

// 清空祝福函数
function clearAllBlessings() {
    const confirmed = confirm('确定要清空所有祝福吗？此操作不可恢复！');
    if (!confirmed) return;

    localStorage.removeItem('blessings');

    // 重置统计和墙面显示
    lastBlessingCount = 0;
    initWall();
    updateStats();
    
    // 显示成功提示
    alert('祝福已清空！');
}

// 按钮点击事件
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', clearAllBlessings);
}

// 隐藏快捷键：Ctrl + Alt + D 清空所有祝福
window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && e.code === 'KeyD') {
        e.preventDefault();
        clearAllBlessings();
    }
});

// 初始化
// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 初始化二维码（会异步获取IP）
        renderQRCode();
        
        // 初始化祝福墙
        initWall();
        updateStats();
        
        // 初始化祝福计数
        lastBlessingCount = getBlessings().length;
    });
} else {
    // DOM已经加载完成，直接执行
    renderQRCode();
    initWall();
    updateStats();
    lastBlessingCount = getBlessings().length;
}


