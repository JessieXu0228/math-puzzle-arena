# 📱 数学谜题打擂台 - 快速开始指南

## 🚀 一键部署到 Vercel（推荐）

### 前置要求：
- ✅ GitHub 账号
- ✅ 电脑已安装 Git
- ✅ 电脑已安装 Node.js

### 部署步骤：

#### 1️⃣ 创建 GitHub 仓库
访问 https://github.com/new 创建新仓库（例如：`math-puzzle-arena`）

#### 2️⃣ 推送代码到 GitHub
```bash
cd /workspace/projects

# 初始化 Git
git init
git add .
git commit -m "Initial commit: 数学谜题打擂台"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/math-puzzle-arena.git
git branch -M main
git push -u origin main
```

#### 3️⃣ 在 Vercel 部署
访问 [vercel.com/new](https://vercel.com/new) 并：
1. 导入你的 GitHub 仓库
2. Vercel 会自动识别 Next.js 项目
3. 添加环境变量（从 `.env` 文件复制）：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`（部署后填写，如：`https://math-puzzle-arena.vercel.app`）
4. 点击 "Deploy"

#### 4️⃣ 重新生成二维码
```bash
# 替换为你的实际域名
node scripts/generate-qrcode-custom.js https://math-puzzle-arena.vercel.app

# 提交新的二维码
git add public/qrcode.png
git commit -m "Update QR code with production URL"
git push
```

#### 5️⃣ 完成！
等待 1-2 分钟后，访问你的域名即可！

---

## 📋 详细部署文档

完整的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)，包含：
- ✅ 多种部署平台对比（Vercel、Netlify、Railway）
- ✅ 环境变量配置说明
- ✅ 自定义域名设置
- ✅ 常见问题解答

---

## 🔧 开发指南

### 本地开发
```bash
cd /workspace/projects
pnpm install
pnpm dev
# 访问 http://localhost:5000
```

### 重新生成二维码（本地测试）
```bash
# 查看电脑 IP（Mac/Linux）
ifconfig

# 查看电脑 IP（Windows）
ipconfig

# 使用局域网 IP 生成二维码（例如：192.168.1.100）
node scripts/generate-qrcode-custom.js http://192.168.1.100:5000
```

---

## 📚 相关文档

- [DEPLOYMENT.md](./DEPLOYMENT.md) - 完整部署指南
- [QRCODE_README.md](./QRCODE_README.md) - 二维码使用指南

---

## 🎯 项目结构

```
math-puzzle-arena/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   ├── create/               # 出题页面
│   │   ├── solve/                # 答题页面
│   │   ├── leaderboard/          # 排行榜页面
│   │   └── api/                  # API 接口
│   ├── components/               # UI 组件
│   └── storage/                  # 数据库配置
├── public/
│   └── qrcode.png                # 二维码
├── scripts/
│   ├── generate-qrcode-custom.js # 生成二维码脚本
│   └── deploy-vercel.sh          # 部署脚本
└── README.md                     # 本文件
```

---

## 💡 提示

1. **首次部署**：选择 Vercel，最简单快速
2. **测试二维码**：先在本地用手机测试（确保同一 WiFi）
3. **生产环境**：部署后务必重新生成二维码
4. **数据安全**：数据存储在 Supabase，不用担心丢失

---

## ❓ 需要帮助？

如果遇到问题：
1. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 的常见问题部分
2. 检查 Vercel 部署日志
3. 确认环境变量配置正确

祝你部署顺利！🎉
