#!/bin/bash

# 数学谜题打擂台 - 快速部署脚本（Vercel）

echo "🚀 数学谜题打擂台 - 快速部署到 Vercel"
echo "=========================================="
echo ""

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    pnpm add -g vercel
fi

# 检查 Git 仓库
if [ ! -d ".git" ]; then
    echo "📝 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: 数学谜题打擂台"
    echo ""
    echo "⚠️  请按照以下步骤操作："
    echo "1. 在 GitHub 创建新仓库（访问 https://github.com/new）"
    echo "2. 运行以下命令添加远程仓库："
    echo "   git remote add origin https://github.com/你的用户名/你的仓库名.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    read -p "按 Enter 继续，确保你已经推送代码到 GitHub..."
fi

# 部署到 Vercel
echo "🌐 开始部署到 Vercel..."
echo ""

# 检查环境变量
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到 .env 文件"
    echo "请确保在 Vercel 控制台配置以下环境变量："
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - NEXT_PUBLIC_APP_URL"
    echo ""
fi

# 部署
vercel --prod

# 获取部署域名
echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 下一步：重新生成二维码"
echo "请在 Vercel 控制台查看你的部署域名，然后运行："
echo ""
echo "  node scripts/generate-qrcode-custom.js https://你的域名.vercel.app"
echo ""
echo "然后提交新的二维码："
echo ""
echo "  git add public/qrcode.png"
echo "  git commit -m 'Update QR code'"
echo "  git push"
echo ""
