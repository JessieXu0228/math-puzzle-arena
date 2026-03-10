const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 二维码内容 - 使用环境变量或默认值
const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000';

// 输出路径
const outputPath = path.join(__dirname, '../public/qrcode.png');

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
    console.error('生成二维码失败:', error);
    process.exit(1);
  }
  console.log('✅ 二维码生成成功！');
  console.log(`📍 保存路径: ${outputPath}`);
  console.log(`🔗 二维码内容: ${url}`);
});
