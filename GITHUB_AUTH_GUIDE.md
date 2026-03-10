# GitHub 认证详细指南

## 📝 问题 1：在哪里输入认证信息？

### 执行 git push 后的输入流程

当你在终端执行 `git push -u origin main` 后，**会在终端（命令行）中直接提示输入认证信息**，不是在网页上！

### 示例流程：

```bash
$ git push -u origin main

# 终端会提示：
Username for 'https://github.com': 在这里输入你的 GitHub 用户名
Password for 'https://你的用户名@github.com': 在这里输入 Personal Access Token
```

### 重要提醒：

1. **用户名**：输入你的 GitHub 账号（不是邮箱）
2. **密码**：输入 Personal Access Token（不是 GitHub 登录密码）
3. **输入时看不到字符**：这是正常的，为了安全，密码输入时不会显示任何字符

### 如果使用 SSH 密钥：

如果你配置了 SSH，使用 SSH 地址推送：
```bash
git remote set-url origin git@github.com:你的用户名/仓库名.git
git push -u origin main
```
SSH 方式不需要每次输入密码。

---

## 🔐 问题 2：如何找到 Developer Settings？

### 方法一：通过 GitHub 主菜单（推荐）

1. **登录 GitHub**
   - 访问 https://github.com
   - 登录你的账号

2. **点击右上角头像**
   - 页面右上角，点击你的头像

3. **选择 "Settings"**
   - 在下拉菜单中找到并点击 "Settings"

4. **找到 Developer Settings**
   - 在左侧菜单栏，向下滚动
   - 在最底部找到 **"Developer settings"**
   - 点击进入

5. **生成 Personal Access Token**
   - 在左侧菜单中点击 **"Personal access tokens"**
   - 选择 **"Tokens (classic)"**
   - 点击 **"Generate new token (classic)"**

---

### 方法二：直接访问 URL

**Developer Settings 直接链接**：
```
https://github.com/settings/tokens
```

**Personal Access Tokens 直接链接**：
```
https://github.com/settings/personal-access-tokens
```

复制链接到浏览器打开即可。

---

### 方法三：详细截图指南

#### 步骤 1: 点击头像
```
GitHub 页面
┌─────────────────────────────────────────┐
│  GitHub         搜索框                │
│  Pull requests  Issues  ...            │
├─────────────────────────────────────────┤
│                                         │
│  [仓库内容...]                          │
│                                         │
│                            [你的头像 ▼] │  ← 点击这里
└─────────────────────────────────────────┘
```

点击头像后，看到下拉菜单：
```
┌─────────────────────────────────┐
│  你的用户名                      │
├─────────────────────────────────┤
│  Your repositories              │
│  Your organizations             │
│  Your projects                  │
│  Your stars                     │
│                                 │
│  Upgrade                        │
│  Settings            ← 点击这里 │  ← 选择 Settings
│  Sign out                       │
└─────────────────────────────────┘
```

#### 步骤 2: 进入 Settings 页面
在左侧菜单栏，滚动到最底部：

```
Settings 页面
┌────────────────────────────────────┐
│  Settings - 你的用户名              │
├────────────────────────────────────┤
│  Public profile              ▶    │
│  Account                       ▶  │
│  Email notifications          ▶  │
│  ...                           │
│  Billing                       ▶  │
│  SSH and GPG keys              ▶  │
│  ...                           │
│                                  │
│  Developer settings        ← 点击 │  ← 在最底部
└────────────────────────────────────┘
```

#### 步骤 3: 进入 Developer Settings
```
Developer settings 页面
┌────────────────────────────────────┐
│  Developer settings                 │
├────────────────────────────────────┤
│  OAuth Apps                        │
│  OAuth App Manager                 │
│  GitHub Apps                       │
│  Personal access tokens      ▶     │  ← 点击这里
│  ...                               │
│  ...                               │
│  Personal access tokens            │
│    Tokens (classic)          ▶     │  ← 点击这里
└────────────────────────────────────┘
```

#### 步骤 4: 生成 Token
```
Tokens (classic) 页面
┌────────────────────────────────────┐
│  Personal access tokens            │
│  Tokens (classic)                  │
├────────────────────────────────────┤
│  [Generate new token (classic)] ← │  ← 点击这个按钮
│                                    │
│  已有的 tokens 列表...             │
└────────────────────────────────────┘
```

---

## 🎯 生成 Personal Access Token 的详细步骤

### 1. 点击 "Generate new token (classic)"

### 2. 填写 Token 信息
- **Note（备注）**：输入一个名称，例如 `math-puzzle-arena` 或 `git push token`
- **Expiration（过期时间）**：建议选择 `No expiration`（永不过期）或较长时间（如 90 days）
- **Scopes（权限）**：勾选 **`repo`** 这个复选框（这会选中所有 repo 相关权限）

权限说明：
```
✓ repo                    // 仓库完全访问权限
  ✓ repo:status          // 仓库状态
  ✓ repo_deployment      // 部署状态
  ✓ public_repo          // 公开仓库
  ✓ repo:invite          // 仓库邀请
  ✓ security_events      // 安全事件
```

### 3. 点击底部的 **"Generate token"** 按钮

### 4. 复制 Token（重要！）
```
┌────────────────────────────────────┐
│  Personal access tokens            │
│                                    │
│  ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx │  ← 这就是你的 Token
│  [Copy]  [Regenerate]              │  ← 点击 Copy 复制
│                                    │
│  ⚠️ Make sure to copy it now.      │
│  You won't be able to see it again!│
└────────────────────────────────────┘
```

⚠️ **重要**：Token 只显示一次，务必立即复制保存！

---

## 🔑 使用 Token 进行 git push

### 在终端执行：

```bash
$ git push -u origin main

# 系统提示：
Username for 'https://github.com': xiaoming  ← 输入你的 GitHub 用户名
Password for 'https://xiaoming@github.com': ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ← 粘贴 Token
```

### 注意事项：

1. **输入用户名**：输入你的 GitHub 用户名（不是邮箱）
2. **输入密码**：粘贴刚才复制的 Personal Access Token
3. **输入密码时看不到字符**：这是正常的，继续粘贴即可
4. **保存 Token**：如果不想每次都输入，可以使用 Git 凭据缓存

---

## 💾 保存 Token（避免每次输入）

### 方法一：使用 Git 凭据缓存（推荐）

```bash
# 缓存凭据 1 小时
git config --global credential.helper 'cache --timeout=3600'

# 或者缓存 1 天
git config --global credential.helper 'cache --timeout=86400'
```

### 方法二：使用 SSH 密钥（推荐长期使用）

1. 生成 SSH 密钥：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. 添加到 GitHub：
   - 复制 `~/.ssh/id_ed25519.pub` 的内容
   - GitHub Settings → SSH and GPG keys → New SSH key

3. 修改远程仓库地址：
```bash
git remote set-url origin git@github.com:你的用户名/你的仓库名.git
```

---

## ❓ 常见错误及解决

### 错误 1: "remote: Invalid username or password"
**原因**：使用了 GitHub 登录密码
**解决**：必须使用 Personal Access Token

### 错误 2: "fatal: Authentication failed"
**原因**：Token 输入错误或过期
**解决**：重新生成 Token 并使用

### 错误 3: 输入密码时没有任何显示
**原因**：这是正常的，密码不会显示
**解决**：直接粘贴 Token，然后按 Enter

---

## 📚 快速链接

- **GitHub 首页**：https://github.com
- **Settings**：https://github.com/settings
- **Developer Settings**：https://github.com/settings/developers
- **Personal Access Tokens**：https://github.com/settings/tokens
- **直接生成 Token**：https://github.com/settings/tokens/new

---

## ✅ 完整操作流程总结

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 点击 "Generate token"
5. 复制生成的 token（只显示一次！）
6. 在终端执行 `git push -u origin main`
7. 输入 GitHub 用户名
8. 粘贴 Token 作为密码
9. 完成！
