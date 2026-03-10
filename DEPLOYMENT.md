# 部署指南 - 数学谜题打擂台

本指南将帮助你将"数学谜题打擂台"部署到公共服务器，让任何人都能通过二维码访问。

## 📋 部署前准备

### 1. 确认项目状态
```bash
cd /workspace/projects
npm run build  # 测试构建是否成功
```

### 2. 准备 Supabase 凭据
你的项目已经配置了 Supabase 数据库，部署时需要以下环境变量（已在 `.env` 文件中）：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🚀 推荐的部署平台

### 方案 1: Vercel（推荐，最简单）

#### 优点：
- ✅ Next.js 官方推荐
- ✅ 免费额度充足
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 零配置部署

#### 部署步骤：

**步骤 1: 创建 Vercel 账号**
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录

**步骤 2: 推送代码到 GitHub**
```bash
# 如果还没有 Git 仓库
cd /workspace/projects
git init
git add .
git commit -m "Initial commit: 数学谜题打擂台"

# 创建 GitHub 仓库并推送
# 1. 在 GitHub 创建新仓库（例如 math-puzzle-arena）
# 2. 添加远程仓库
git remote add origin https://github.com/你的用户名/math-puzzle-arena.git
git branch -M main
git push -u origin main
```

**步骤 3: 在 Vercel 导入项目**
1. 登录 Vercel，点击 "Add New Project"
2. 选择你的 GitHub 仓库
3. Vercel 会自动识别 Next.js 项目

**步骤 4: 配置环境变量**
1. 在 "Environment Variables" 部分，添加以下变量（从你的 `.env` 文件复制）：
   ```
   NEXT_PUBLIC_SUPABASE_URL=你的Supabase_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase_Anon_Key
   NEXT_PUBLIC_APP_URL=https://你的域名.vercel.app
   ```
2. 点击 "Deploy"

**步骤 5: 等待部署完成**
- 部署通常需要 1-2 分钟
- 完成后会获得一个类似 `https://math-puzzle-arena.vercel.app` 的域名

**步骤 6: 重新生成二维码**
```bash
node scripts/generate-qrcode-custom.js https://你的域名.vercel.app
```

---

### 方案 2: Netlify（免费，支持自定义域名）

#### 优点：
- ✅ 免费额度充足
- ✅ 支持自定义域名
- ✅ 自动 HTTPS
- ✅ 简单易用

#### 部署步骤：

**步骤 1: 构建项目**
```bash
cd /workspace/projects
pnpm run build
```

**步骤 2: 安装 Netlify CLI**
```bash
pnpm add -g netlify-cli
```

**步骤 3: 部署**
```bash
netlify deploy --prod
```

**步骤 4: 配置环境变量**
在 Netlify 控制台的 "Site Settings" → "Environment Variables" 中添加：
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_APP_URL
```

---

### 方案 3: Railway（全栈部署）

#### 优点：
- ✅ 支持数据库
- ✅ 免费额度
- ✅ 简单配置

#### 部署步骤：

1. 访问 [railway.app](https://railway.app)
2. 创建新项目，选择 "Deploy from GitHub repo"
3. 选择你的仓库
4. 添加环境变量
5. Railway 会自动部署并提供域名

---

## 🔧 环境变量配置（重要！）

所有平台都需要配置以下环境变量：

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_APP_URL` | 应用访问地址 | 部署后获得的域名 |

### 如何获取 Supabase 凭据：

1. 访问 [supabase.com](https://supabase.com)
2. 登录你的账号
3. 选择你的项目
4. 点击左侧 "Settings" → "API"
5. 复制以下信息：
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📱 重新生成二维码

部署成功后，需要重新生成二维码：

### 步骤：

1. **获取部署域名**
   - Vercel: `https://your-project.vercel.app`
   - Netlify: `https://your-project.netlify.app`
   - Railway: `https://your-project.railway.app`

2. **重新生成二维码**
   ```bash
   cd /workspace/projects
   node scripts/generate-qrcode-custom.js https://your-domain.vercel.app
   ```

3. **将新的二维码推送到服务器**
   ```bash
   git add public/qrcode.png
   git commit -m "Update QR code with production URL"
   git push
   ```

---

## 🌐 自定义域名（可选）

### Vercel 自定义域名：
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名（例如 `math-puzzle.yourdomain.com`）
3. 在域名注册商处添加 CNAME 记录：
   ```
   CNAME  math-puzzle  cname.vercel-dns.com
   ```

### Netlify 自定义域名：
1. 在 Netlify 控制台点击 "Domain settings"
2. 添加自定义域名
3. 按照提示配置 DNS

---

## 🧪 部署后测试

1. **访问主页**
   ```
   https://your-domain.vercel.app
   ```

2. **测试功能**
   - 创建题目
   - 回答题目
   - 查看排行榜

3. **测试二维码**
   - 用手机扫码
   - 确保能正常访问

---

## 📊 成本对比

| 平台 | 免费额度 | 超出费用 |
|------|----------|----------|
| Vercel | 100GB 带宽/月 | $20/100GB |
| Netlify | 100GB 带宽/月 | $19/100GB |
| Railway | $5 免费额度 | $0.0000002/秒 |

对于小型教育项目，免费额度完全够用！

---

## 🔄 更新部署

修改代码后，只需：

**Vercel:**
```bash
git add .
git commit -m "Update something"
git push
# Vercel 自动检测并重新部署
```

**Netlify:**
```bash
pnpm run build
netlify deploy --prod
```

---

## ❓ 常见问题

### Q: 部署后 Supabase 连接失败？
A: 检查环境变量是否正确配置，确保 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 正确。

### Q: 二维码还是指向 localhost？
A: 需要重新生成二维码，并提交到仓库。

### Q: 如何查看部署日志？
A:
- Vercel: 在项目设置中查看 "Deployments" → 点击具体部署
- Netlify: 在 "Deploys" 中查看

### Q: 可以使用免费 SSL 证书吗？
A: Vercel、Netlify、Railway 都自动提供免费的 Let's Encrypt SSL 证书。

### Q: 部署后数据会丢失吗？
A: 不会，数据存储在 Supabase 数据库中，与部署平台无关。

---

## 🎯 推荐方案总结

对于你的"数学谜题打擂台"项目，我推荐：

### 🥇 最佳选择：Vercel
- 原因：Next.js 官方支持，配置最简单，性能最好
- 成本：免费额度充足
- 时间：5-10 分钟完成部署

### 🥈 备选方案：Netlify
- 原因：界面友好，支持自定义域名
- 成本：免费额度充足
- 时间：10-15 分钟完成部署

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看平台文档
2. 检查部署日志
3. 确认环境变量配置

祝你部署顺利！🚀
