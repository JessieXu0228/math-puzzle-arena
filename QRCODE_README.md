# 二维码生成指南

## 问题说明
当前二维码指向 `http://localhost:5000`，这只能在同一台电脑上访问，手机扫码后会显示空白页。

## 解决方案

### 方案 1：使用局域网 IP（推荐用于本地测试）

1. **查看电脑的局域网 IP 地址**
   - Windows: 打开命令提示符，输入 `ipconfig`，找到 IPv4 地址（如 192.168.1.100）
   - Mac/Linux: 打开终端，输入 `ifconfig` 或 `ip addr`，找到 IPv4 地址

2. **重新生成二维码**
   ```bash
   cd /workspace/projects
   node scripts/generate-qrcode-custom.js http://192.168.1.100:5000
   ```
   （将 192.168.1.100 替换为你实际的 IP 地址）

3. **确保手机和电脑在同一 WiFi 网络**

4. **手机扫码即可访问**

### 方案 2：使用公网域名（部署后使用）

1. **将应用部署到公网服务器**

2. **修改 .env 文件**
   ```env
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

3. **重新生成二维码**
   ```bash
   cd /workspace/projects
   node scripts/generate-qrcode-custom.js
   ```

## 常见问题

### Q: 为什么手机扫码后显示空白页？
A: 二维码指向的 URL 是 localhost，手机无法访问电脑的 localhost。需要使用局域网 IP 或公网域名。

### Q: 如何查看电脑的 IP 地址？
A:
- Windows: 命令提示符输入 `ipconfig`
- Mac: 终端输入 `ifconfig`
- Linux: 终端输入 `ip addr`

### Q: 手机和电脑不在同一 WiFi 怎么办？
A: 必须在同一网络才能通过局域网 IP 访问。如果不在同一网络，需要部署到公网或使用内网穿透工具。

## 脚本使用

### 使用默认 URL（从 .env 读取）
```bash
node scripts/generate-qrcode-custom.js
```

### 指定自定义 URL
```bash
node scripts/generate-qrcode-custom.js http://192.168.1.100:5000
node scripts/generate-qrcode-custom.js https://example.com
```

### 生成后
- 二维码保存在 `public/qrcode.png`
- 刷新页面即可看到新的二维码
- 建议清除手机浏览器缓存后重新扫码
