# GitHub 代码推送指南

## 📍 当前状态

✅ 你的项目已经初始化了 Git 仓库
✅ 已有 3 次代码提交
❌ 还没有连接到 GitHub 远程仓库

---

## 🚀 推送代码到 GitHub 的步骤

### 步骤 1: 创建 GitHub 仓库

1. 访问 [GitHub 新建仓库页面](https://github.com/new)
2. 填写仓库信息：
   - **Repository name**: `math-puzzle-arena`（或你喜欢的名字）
   - **Description**: 数学谜题打擂台 - 来出个题，来解个谜
   - **Public/Private**: 选择 Public（公开）或 Private（私有）
   - **不要勾选** "Initialize this repository with a README"
   - **不要勾选** "Add .gitignore"
   - **不要勾选** "Choose a license"
3. 点击 "Create repository"

---

### 步骤 2: 获取仓库地址

创建成功后，复制你的仓库地址：
- HTTPS: `https://github.com/你的用户名/math-puzzle-arena.git`
- SSH: `git@github.com:你的用户名/math-puzzle-arena.git`

**推荐使用 HTTPS**（如果你还没有配置 SSH 密钥）

---

### 步骤 3: 连接 GitHub 仓库

在终端执行以下命令（**在项目根目录**）：

```bash
cd /workspace/projects

# 添加远程仓库（替换为你的实际地址）
git remote add origin https://github.com/你的用户名/math-puzzle-arena.git

# 验证远程仓库
git remote -v
```

执行后应该看到：
```
origin  https://github.com/你的用户名/math-puzzle-arena.git (fetch)
origin  https://github.com/你的用户名/math-puzzle-arena.git (push)
```

---

### 步骤 4: 推送代码到 GitHub

```bash
cd /workspace/projects

# 推送到 GitHub（首次推送需要 -u 参数）
git push -u origin main
```

如果出现认证提示，输入你的 GitHub 用户名和密码（或 Personal Access Token）。

**注意**：如果使用密码认证失败，GitHub 现在要求使用 Personal Access Token。

---

## 🔐 GitHub 认证方式

### 方式 1: 使用 Personal Access Token（推荐）

1. 访问 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 设置 token 名称，选择权限（勾选 `repo`）
4. 生成 token（只显示一次，务必复制保存）
5. 在 `git push` 时，用户名输入 GitHub 用户名，密码输入这个 token

### 方式 2: 使用 SSH 密钥

如果你已经配置了 SSH 密钥，可以使用 SSH 地址推送：

```bash
git remote set-url origin git@github.com:你的用户名/math-puzzle-arena.git
git push -u origin main
```

---

## 📝 完整操作示例

假设你的 GitHub 用户名是 `xiaoming`，仓库名是 `math-puzzle-arena`：

```bash
# 1. 进入项目目录
cd /workspace/projects

# 2. 添加远程仓库
git remote add origin https://github.com/xiaoming/math-puzzle-arena.git

# 3. 推送代码
git push -u origin main

# 系统提示：
# Username: xiaoming
# Password: <输入你的 Personal Access Token>
```

---

## ✅ 验证推送成功

推送完成后，访问你的 GitHub 仓库地址：
```
https://github.com/你的用户名/math-puzzle-arena
```

你应该能看到：
- 所有代码文件
- 3 次提交记录
- README.md 等文档

---

## 🔄 后续更新代码

代码修改后，只需执行：

```bash
git add .
git commit -m "你的提交信息"
git push
```

---

## ❓ 常见问题

### Q1: 提示 "fatal: remote origin already exists"
**解决**: 使用 `git remote set-url` 替代 `git remote add`
```bash
git remote set-url origin https://github.com/你的用户名/你的仓库名.git
```

### Q2: 提示 "authentication failed"
**解决**: GitHub 不再支持密码认证，需要使用 Personal Access Token

### Q3: 推送时提示 "error: failed to push some refs"
**解决**: 可能需要先拉取远程代码
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Q4: 如何查看当前的 Git 状态？
```bash
git status
git remote -v
git log --oneline
```

---

## 📚 下一步

推送成功后，继续下一步：
1. 访问 [Vercel](https://vercel.com/new)
2. 导入你的 GitHub 仓库
3. 配置环境变量
4. 部署应用

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
