# 📚 创建GitHub仓库并部署到Vercel - 详细步骤

## 第一步：创建GitHub仓库

### 1.1 登录GitHub
- 打开浏览器，访问：https://github.com
- 如果没有账号，点击 "Sign up" 注册（免费）
- 如果已有账号，点击 "Sign in" 登录

### 1.2 创建新仓库
1. 登录后，点击右上角的 **"+"** 号
2. 选择 **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `blessing-wall` （或你喜欢的名字）
   - **Description**: `祝福墙签到抽奖系统` （可选）
   - **Visibility**: 选择 **Public**（公开，免费）或 **Private**（私有，需要付费）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"
   - ⚠️ **不要**添加 .gitignore 或 license（我们已经有了）
4. 点击 **"Create repository"**

### 1.3 复制仓库地址
创建成功后，GitHub会显示一个页面，你会看到：
- **HTTPS地址**：类似 `https://github.com/你的用户名/blessing-wall.git`
- **SSH地址**：类似 `git@github.com:你的用户名/blessing-wall.git`

**请复制HTTPS地址，我们稍后会用到！**

---

## 第二步：上传代码到GitHub

### 方法A：使用Git命令行（推荐）

#### 2.1 初始化Git仓库
在项目文件夹中打开命令行（PowerShell或CMD），执行：

```bash
cd "D:\project\Check-in code"
git init
```

#### 2.2 添加所有文件
```bash
git add .
```

#### 2.3 提交代码
```bash
git commit -m "Initial commit: 祝福墙签到抽奖系统"
```

#### 2.4 连接到GitHub仓库
```bash
git remote add origin https://github.com/你的用户名/blessing-wall.git
```
⚠️ **请将上面的地址替换为你刚才复制的实际地址！**

#### 2.5 推送到GitHub
```bash
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码：
- **用户名**：你的GitHub用户名
- **密码**：需要使用 **Personal Access Token**（不是GitHub密码）
  - 如果还没有Token，看下面的"创建Personal Access Token"部分

### 方法B：使用GitHub Desktop（图形界面，更简单）

1. 下载安装：https://desktop.github.com/
2. 打开GitHub Desktop
3. 点击 **File** → **Add Local Repository**
4. 选择文件夹：`D:\project\Check-in code`
5. 点击 **Publish repository**
6. 填写仓库名称，点击 **Publish**

### 方法C：直接在GitHub网页上传（最简单）

1. 在GitHub仓库页面，点击 **"uploading an existing file"**
2. 将所有文件拖拽到页面
3. 在底部填写提交信息：`Initial commit`
4. 点击 **"Commit changes"**

---

## 第三步：创建Personal Access Token（如果需要）

如果使用命令行推送时提示需要密码：

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写信息：
   - **Note**: `Vercel部署` （随便写）
   - **Expiration**: 选择过期时间（建议90天或更长）
   - **Scopes**: 勾选 `repo`（全部权限）
4. 点击 **"Generate token"**
5. **复制生成的Token**（只显示一次，请保存好！）
6. 推送代码时，密码处输入这个Token

---

## 第四步：部署到Vercel

### 4.1 访问Vercel
- 打开：https://vercel.com
- 点击 **"Sign Up"** 或 **"Log In"**
- 选择 **"Continue with GitHub"**（使用GitHub账号登录）

### 4.2 导入项目
1. 登录后，点击 **"Add New Project"**
2. 在 **"Import Git Repository"** 部分，找到你的仓库 `blessing-wall`
3. 点击 **"Import"**

### 4.3 配置项目
1. **Project Name**: 可以保持默认或修改
2. **Framework Preset**: 选择 **"Other"**
3. **Root Directory**: 留空（或填写 `.`）
4. **Build Command**: **留空**（因为是静态文件，不需要构建）
5. **Output Directory**: **留空**（或填写 `.`）
6. **Install Command**: 留空

### 4.4 部署
1. 点击 **"Deploy"**
2. 等待部署完成（通常1-2分钟）
3. 看到 **"Congratulations!"** 表示部署成功

### 4.5 获取公网地址
部署完成后，你会看到：
- **Your Project**: `https://your-project-name.vercel.app`
- 这就是你的公网访问地址！

---

## 第五步：测试部署

### 5.1 打开大屏页面
在浏览器中打开：
```
https://your-project-name.vercel.app/wall-with-qr.html
```

### 5.2 检查二维码
- 应该能看到左侧的二维码
- 二维码应该指向：`https://your-project-name.vercel.app/index.html`

### 5.3 微信扫码测试
1. 用微信扫描二维码
2. 应该能正常打开签到页面
3. 填写测试祝福并提交
4. 检查大屏页面是否显示祝福

---

## ✅ 完成！

现在你的祝福墙系统已经部署到公网，任何人都可以通过微信扫码访问了！

### 📝 重要提示

1. **数据存储**：目前使用localStorage，每个设备的数据是独立的
2. **更新代码**：如果修改了代码，推送到GitHub后，Vercel会自动重新部署
3. **自定义域名**：可以在Vercel设置中绑定自己的域名（需要域名）

### 🆘 遇到问题？

如果遇到任何问题，请告诉我：
- 在哪一步卡住了？
- 看到了什么错误信息？
- 我可以帮你解决！

