// 获取祝福数据
function getBlessings() {
    let blessings = JSON.parse(localStorage.getItem('blessings') || '[]');
    
    // 如果没有数据，自动添加测试数据（仅用于演示）
    if (blessings.length === 0) {
        blessings = [
            { name: '张三', group: 'student', blessing: '祝分院蒸蒸日上，同学们前程似锦，未来可期！' },
            { name: '李四', group: 'student', blessing: '祝老师们工作顺利，身体健康，桃李满天下！' },
            { name: '王五', group: 'student', blessing: '愿同学们学业有成，梦想成真，不负青春！' },
            { name: '王老师', group: 'teacher', blessing: '祝同学们在未来的道路上勇敢追梦，成就精彩人生！' },
            { name: '李老师', group: 'teacher', blessing: '愿分院越办越好，培养更多优秀人才！' }
        ];
        localStorage.setItem('blessings', JSON.stringify(blessings));
    }
    
    return blessings;
}

// DOM元素
const studentBtn = document.querySelector('[data-group="student"]');
const teacherBtn = document.querySelector('[data-group="teacher"]');
const drawBtn = document.getElementById('drawBtn');
const result = document.getElementById('result');
const drawing = document.getElementById('drawing');
const winnerName = document.getElementById('winnerName');
const winnerBlessing = document.getElementById('winnerBlessing');
const winnerGroup = document.getElementById('winnerGroup');

let currentGroup = 'student';

// 切换分组
studentBtn.addEventListener('click', function() {
    currentGroup = 'student';
    studentBtn.classList.add('active');
    teacherBtn.classList.remove('active');
    result.classList.add('hidden');
});

teacherBtn.addEventListener('click', function() {
    currentGroup = 'teacher';
    teacherBtn.classList.add('active');
    studentBtn.classList.remove('active');
    result.classList.add('hidden');
});

// 抽奖
drawBtn.addEventListener('click', function() {
    const blessings = getBlessings();
    const groupBlessings = blessings.filter(b => b.group === currentGroup);
    
    if (groupBlessings.length === 0) {
        alert(`当前${currentGroup === 'student' ? '学生组' : '老师组'}还没有祝福，无法抽奖！`);
        return;
    }
    
    // 显示抽奖动画
    result.classList.add('hidden');
    drawing.classList.remove('hidden');
    drawBtn.disabled = true;
    
    // 模拟抽奖过程（1.5秒）
    setTimeout(() => {
        // 随机选择一个祝福
        const randomIndex = Math.floor(Math.random() * groupBlessings.length);
        const winner = groupBlessings[randomIndex];
        
        // 显示结果
        drawing.classList.add('hidden');
        result.classList.remove('hidden');
        
        winnerName.textContent = winner.name;
        winnerBlessing.textContent = winner.blessing;
        winnerGroup.textContent = currentGroup === 'student' ? '学生组' : '老师组';
        
        // 创建彩纸效果
        createConfetti();
        
        // 启用按钮
        drawBtn.disabled = false;
    }, 1500);
});

// 创建彩纸效果
function createConfetti() {
    const confetti = document.querySelector('.confetti');
    confetti.innerHTML = '';
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.width = Math.random() * 10 + 5 + 'px';
        piece.style.height = piece.style.width;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = '-10px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        piece.style.animationDelay = Math.random() * 2 + 's';
        confetti.appendChild(piece);
    }
}

// 添加CSS动画（动态添加）
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(600px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

