// 数据存储（实际项目中应使用后端API）
let blessings = JSON.parse(localStorage.getItem('blessings') || '[]');

// DOM元素
const nameInput = document.getElementById('name');
const groupSelect = document.getElementById('group');
const blessingTextarea = document.getElementById('blessing');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// 字符计数
blessingTextarea.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    if (count > 80) {
        charCount.style.color = '#ff6b6b';
    } else {
        charCount.style.color = '#999';
    }
});

// 提交祝福
submitBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const group = groupSelect.value;
    const blessing = blessingTextarea.value.trim();
    
    // 验证
    if (!name || !group || !blessing) {
        alert('请填写完整信息！');
        return;
    }
    
    if (blessing.length < 5) {
        alert('祝福语至少需要5个字符！');
        return;
    }
    
    // 禁用按钮
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    
    // 创建祝福对象
    const blessingObj = {
        id: Date.now() + Math.random(),
        name: name,
        group: group,
        blessing: blessing,
        timestamp: new Date().toISOString()
    };
    
    // 保存到本地存储
    blessings.push(blessingObj);
    localStorage.setItem('blessings', JSON.stringify(blessings));
    
    // 发送到服务器（如果有后端API）
    // fetch('/api/blessings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(blessingObj)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    
    // 显示成功消息
    setTimeout(() => {
        successMessage.classList.remove('hidden');
        
        // 3秒后自动关闭并重置表单
        setTimeout(() => {
            successMessage.classList.add('hidden');
            nameInput.value = '';
            groupSelect.value = '';
            blessingTextarea.value = '';
            charCount.textContent = '0';
            submitBtn.disabled = false;
            submitBtn.textContent = '提交祝福';
        }, 3000);
    }, 500);
});

// 点击背景关闭成功消息
successMessage.addEventListener('click', function(e) {
    if (e.target === successMessage) {
        successMessage.classList.add('hidden');
    }
});

