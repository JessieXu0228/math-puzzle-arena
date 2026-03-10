# 修复 Git Push 错误

## ❌ 错误信息
```
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/JessieXu0228/math-puzzle-arena.git'
```

## 🔍 问题原因

本地有 `main` 分支和提交记录，但是**没有添加 GitHub 远程仓库**（`git remote -v` 没有输出）。

## ✅ 解决方法

### 方法一：重新添加远程仓库并推送

```bash
cd /workspace/projects

# 1. 添加远程仓库
git remote add origin https://github.com/JessieXu0228/math-puzzle-arena.git

# 2. 验证远程仓库已添加
git remote -v
# 应该看到：
# origin  https://github.com/JessieXu0228/math-puzzle-arena.git (fetch)
# origin  https://github.com/JessieXu0228/math-puzzle-arena.git (push)

# 3. 推送代码到 GitHub
git push -u origin main
```

### 方法二：如果提示 remote 已存在

如果执行 `git remote add` 时提示 "remote origin already exists"，先删除旧的：

```bash
cd /workspace/projects

# 1. 删除旧的远程仓库
git remote remove origin

# 2. 重新添加
git remote add origin https://github.com/JessieXu0228/math-puzzle-arena.git

# 3. 推送代码
git push -u origin main
```

### 方法三：使用 set-url（推荐）

```bash
cd /workspace/projects

# 设置远程仓库 URL
git remote set-url origin https://github.com/JessieXu0228/math-puzzle-arena.git

# 验证
git remote -v

# 推送
git push -u origin main
```

---

## 🔐 推送时的认证信息

执行 `git push -u origin main` 后，终端会提示：

```bash
Username for 'https://github.com': JessieXu0228
Password for 'https://JessieXu0228@github.com': ghp_xxxxxxxxxxxxxxxxxxxxxx
```

**注意**：
- 用户名：输入你的 GitHub 用户名 `JessieXu0228`
- 密码：粘贴 Personal Access Token（不是登录密码）

---

## 📝 完整操作流程（复制粘贴即可）

```bash
cd /workspace/projects

# 添加远程仓库
git remote add origin https://github.com/JessieXu0228/math-puzzle-arena.git

# 推送代码（会提示输入认证信息）
git push -u origin main
```

---

## ✅ 验证推送成功

推送完成后，访问：
```
https://github.com/JessieXu0228/math-puzzle-arena
```

你应该能看到：
- 所有代码文件
- 提交记录（6 个提交）
- README.md 等文档

---

## 🚀 推送成功后，下一步

访问 [Vercel](https://vercel.com/new) 并：
1. 导入你的 GitHub 仓库
2. 配置环境变量（从 `.env` 文件复制）
3. 部署应用

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
