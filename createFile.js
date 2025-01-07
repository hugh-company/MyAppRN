const fs = require('fs');
const path = require('path');

/**
 * Tạo thư mục và file với nội dung định sẵn.
 * @param {string} folderName - Tên của thư mục (ví dụ: 'home').
 * @param {string} fileName - Tên của file chính (ví dụ: 'HomeScreen').
 */
const createFolderAndFiles = (folderName, fileName) => {
  if (!folderName || !fileName) {
    console.error('❌ Error: Please provide a folder name and file name.');
    console.error('👉 Usage: node createStructure.js <folderName> <fileName>');
    return;
  }

  const folderPath = path.join(__dirname, `src/screens/${folderName}`);

  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive: true});
    console.log(`📂 Created folder: ${folderPath}`);
  }

  // Danh sách file và nội dung tương ứng
  const files = [
    {
      name: 'index.ts',
      content: `export { default as ${fileName} } from './${fileName}';\n`,
    },
    {
      name: `${fileName}.tsx`,
      content: `import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { use${fileName} } from './${fileName}.hook';

const ${fileName} = () => {
  const { data, themeColors, styles } = use${fileName}();

  return (
    <View style={styles.container}>
      <AppText>${fileName}</AppText>
    </View>
  );
};

export default ${fileName};\n`,
    },
    {
      name: `${fileName}.hook.ts`,
      content: `import { useTheme } from '@theme';
import { useState } from 'react';
import { createStyles } from './styles';

export const use${fileName} = () => {
  const [data, setData] = useState([]);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return { data, themeColors, styles };
};\n`,
    },
    {
      name: 'styles.ts',
      content: `import { ThemeColors } from '@theme';
import { StyleSheet } from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
  });\n`,
    },
  ];

  // Tạo từng file trong danh sách
  files.forEach(file => {
    const filePath = path.join(folderPath, file.name);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content, 'utf8');
      console.log(`📄 Created file: ${filePath}`);
    } else {
      console.log(`⚠️ File already exists: ${filePath}`);
    }
  });

  console.log('🎉 Folder and files created successfully!');
};
const createComponent = (folderName, fileName) => {
  if (!folderName || !fileName) {
    console.error('❌ Error: Please provide a folder name and file name.');
    console.error('👉 Usage: node createStructure.js <folderName> <fileName>');
    return;
  }

  const folderPath = path.join(__dirname, `src/components/${folderName}`);

  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive: true});
    console.log(`📂 Created folder: ${folderPath}`);
  }

  // Danh sách file và nội dung tương ứng
  const files = [
    {
      name: 'index.ts',
      content: `export { default as ${fileName} } from './${fileName}';\n`,
    },
    {
      name: `${fileName}.tsx`,
      content: `import { AppText } from '@components';
import React from 'react';
import { useTheme } from '@theme';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface ${fileName}Props{}
const ${fileName} = ({}:${fileName}Props) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText>${fileName}</AppText>
    </View>
  );
};

export default ${fileName};\n`,
    },
    {
      name: 'styles.ts',
      content: `import { ThemeColors } from '@theme';
import { StyleSheet } from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
  });\n`,
    },
  ];

  // Tạo từng file trong danh sách
  files.forEach(file => {
    const filePath = path.join(folderPath, file.name);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content, 'utf8');
      console.log(`📄 Created file: ${filePath}`);
    } else {
      console.log(`⚠️ File already exists: ${filePath}`);
    }
  });

  console.log('🎉 Folder and files created successfully!');
};

// Nhận tên thư mục từ tham số dòng lệnh
const args = process.argv.slice(2);
const [type, folderName, fileName] = args;

if (!folderName || !fileName) {
  console.error(
    '❌ Error: Please provide a folder name and file name as arguments.',
  );
  console.error('👉 Usage: node createStructure.js <folderName> <fileName>');
} else {
  if (type === 'screen') {
    createFolderAndFiles(folderName, fileName);
  } else if (type === 'svg') {
    createComponent(folderName, fileName);
  } else {
    createComponent(folderName, fileName);
  }
}
