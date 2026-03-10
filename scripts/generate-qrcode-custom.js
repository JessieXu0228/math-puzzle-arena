const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 从命令行参数获取 URL，如果没有则使用默认值
const url = process.argv[2] || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';

// 输出路径
const outputPath = path.join(__dirname, '../public/qrcode.png');

console.log('🔧 开始生成二维码...');
console.log(`📍 目标 URL: ${url}`);

// 生成二维码
QRCode.toFile(outputPath, url, {
  width: 512,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  errorCorrectionLevel: 'H'
}, function(error) {
  if (error) {
    console.error('❌ 生成二维码失败:', error);
    process.exit(1);
  }
  console.log('✅ 二维码生成成功！');
  console.log(`📍 保存路径: ${outputPath}`);
  console.log(`🔗 二维码内容: ${url}`);
  console.log('');
  console.log('💡 使用提示：');
  console.log('   - 如果是本地开发，确保手机和电脑在同一 WiFi 网络');
  console.log(`   - 手机浏览器访问: ${url}`);
  console.log('   - 或者修改 .env 文件中的 NEXT_PUBLIC_APP_URL 后重新生成');
});
