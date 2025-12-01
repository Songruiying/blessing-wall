// 获取祝福数据
function getBlessings() {
    return JSON.parse(localStorage.getItem('blessings') || '[]');
}

// 创建圆形祝福气泡（姓名 + 祝福语）
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

// 随机位置
function getRandomPosition() {
    const wall = document.getElementById('wall');
    const wallWidth = wall.clientWidth;
    const wallHeight = wall.clientHeight;
    
    return {
        left: Math.random() * (wallWidth - 200) + 'px',
        top: Math.random() * (wallHeight - 150) + 100 + 'px'
    };
}

// 添加信封到墙
function addEnvelopeToWall(blessing) {
    const wall = document.getElementById('wall');
    const envelope = createEnvelope(blessing);
    const position = getRandomPosition();
    
    envelope.style.left = position.left;
    envelope.style.top = position.top;
    
    wall.appendChild(envelope);
    
    // 移除new类，停止闪烁
    setTimeout(() => {
        envelope.classList.remove('new');
    }, 6000);
}

// 更新统计信息
function updateStats() {
    const blessings = getBlessings();
    const studentCount = blessings.filter(b => b.group === 'student').length;
    const teacherCount = blessings.filter(b => b.group === 'teacher').length;
    
    document.getElementById('totalCount').textContent = blessings.length;
    document.getElementById('studentCount').textContent = studentCount;
    document.getElementById('teacherCount').textContent = teacherCount;
}

// 初始化祝福墙
function initWall() {
    const wall = document.getElementById('wall');
    // 保留飘动提示文字
    const floatingTip = wall.querySelector('.floating-tip');
    wall.innerHTML = '';
    if (floatingTip) {
        wall.appendChild(floatingTip);
    }
    
    const blessings = getBlessings();
    
    // 如果有祝福，隐藏提示文字
    const tip = wall.querySelector('.floating-tip');
    if (tip) {
        tip.style.display = blessings.length > 0 ? 'none' : 'block';
    }
    
    // 添加所有现有祝福
    blessings.forEach((blessing, index) => {
        setTimeout(() => {
            addEnvelopeToWall(blessing);
        }, index * 200);
    });
    
    updateStats();
}

// 监听存储变化（跨标签页同步）
window.addEventListener('storage', function(e) {
    if (e.key === 'blessings') {
        initWall();
    }
});

// 定期检查新祝福（同标签页）
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
        
        // 有祝福后隐藏提示文字
        const wall = document.getElementById('wall');
        const tip = wall.querySelector('.floating-tip');
        if (tip && blessings.length > 0) {
            tip.style.display = 'none';
        }
    }
}, 1000);

// 初始化
initWall();
lastBlessingCount = getBlessings().length;

