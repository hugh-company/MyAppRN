// Trả về style cho ext domain: màu sắc và nền bắt mắt, có thể random theo ext hoặc quy định sẵn cho 1 số ext phổ biến
import {TextStyle} from 'react-native';

const extColorMap: Record<string, {color: string; backgroundColor: string}> = {
  '.org': {color: '#fff', backgroundColor: '#8e44ad'},
  '.info': {color: '#fff', backgroundColor: '#16a085'},
  '.biz': {color: '#fff', backgroundColor: '#e74c3c'},

  '.com': {
    color: 'red', // hiển thị inline style color: red
    backgroundColor: '#f6dacc',
  },
  '.xyz': {
    color: '#8b57e5', // không có style riêng => kế thừa
    backgroundColor: '#e7dcfa',
  },
  '.net': {
    color: '#0080ff',
    backgroundColor: '#cbe5fe',
  },
  '.vn': {
    color: '#06b337',
    backgroundColor: '#dbf0e1',
  },
  // ...có thể thêm các ext khác
};

export function getDomainExtStyle(ext: string): TextStyle {
  const style = extColorMap[ext.toLowerCase()];
  if (style)
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
    };
  // Nếu không có trong map thì random màu nền
  const bgColors = [
    '#4ABAB9',
    '#E67E22',
    '#2980b9',
    '#8e44ad',
    '#16a085',
    '#e74c3c',
    '#2ecc71',
  ];
  const bg = bgColors[Math.abs(hashCode(ext)) % bgColors.length];
  return {
    color: '#fff',
    backgroundColor: bg,
  };
}

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
