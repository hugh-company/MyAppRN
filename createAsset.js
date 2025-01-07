const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

/**
 * Tạo thư mục và file với nội dung định sẵn.
 * @param {string} folderName - Tên của thư mục (ví dụ: 'home').
 * @param {string} fileName - Tên của file chính (ví dụ: 'HomeScreen').
 */
// create icon svg
const createIcon = fileName => {
  const folderPath = path.join(__dirname, 'src/assets/icons');
  // Danh sách file và nội dung tương ứng
  const files = [
    {
      name: `${fileName}.tsx`,
      content: `import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ${fileName} = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
        <Svg width={width} height={height} viewBox="0 0 19 20"  fill="none">
   </Svg>
  );
};

export default ${fileName};\n`,
    },
  ];

  // Tạo từng file trong danh sách
  files.forEach(file => {
    const filePath = path.join(folderPath, file.name);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content, 'utf8');
      console.log(`📄 Created file: ${filePath}`);
      // Mở file sau khi tạo
      exec(`code ${filePath}`, err => {
        if (err) {
          console.error(`❌ Error opening file: ${filePath}`);
        } else {
          console.log(`🚀 Opened file: ${filePath}`);
        }
      });
    } else {
      console.log(`⚠️ File already exists: ${filePath}`);
    }
  });

  console.log('🎉 Folder and files created successfully!');
  updateIndexFile(fileName);
};

const updateIndexFile = fileName => {
  const indexPath = path.join(__dirname, 'src/assets/icons/index.ts');
  const exportStatement = `export { default as ${fileName} } from './${fileName}';\n`;

  if (fs.existsSync(indexPath)) {
    fs.appendFileSync(indexPath, exportStatement, 'utf8');
    console.log(`📄 Updated index file: ${indexPath}`);
  } else {
    fs.writeFileSync(indexPath, exportStatement, 'utf8');
    console.log(`📄 Created index file: ${indexPath}`);
  }
};

// Nhận tên thư mục từ tham số dòng lệnh
const args = process.argv.slice(2);
const [type, fileName] = args;

if (!fileName) {
  console.error(
    '❌ Error: Please provide a folder name and file name as arguments.',
  );
  console.error('👉 Usage: node createStructure.js <folderName> <fileName>');
} else {
  createIcon(fileName);
}
