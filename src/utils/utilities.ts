import {MMKV} from 'react-native-mmkv';
export const AsyncStorage = new MMKV();
export const mmkvStorage = {
  getItem: (key: string) => AsyncStorage.getString(key) ?? null,
  setItem: (key: string, value: string) => AsyncStorage.set(key, value),
  removeItem: (key: string) => AsyncStorage.delete(key),
};
export const showNotificationSuccess = (
  title: string,
  description: string,
) => {};
export const showNotificationError = (title: string, description: string) => {};
export const showNotificationWarning = (
  title: string,
  description: string,
) => {};

export const generateId = () => {
  return Date.now().toString();
};
export type DecimalFormat = '1k' | '1.2k' | '1.23k' | '1.234k' | '1,234';

export const getDecimalsByFormat = (
  value: DecimalFormat,
  isCurrency?: boolean,
): number => {
  let decimals = 0;
  switch (value) {
    default:
    case '1k':
      decimals = 0;
      break;
    case '1.2k':
      decimals = 1;
      break;
    case '1.23k':
      decimals = 2;
      break;
    case '1.234k':
      decimals = 3;
      break;
    case '1,234':
      decimals = isCurrency ? 2 : 0;
      break;
  }
  return decimals;
};
export const getPrettyNumberString = (
  rawNumber: number,
  numberFormat?: DecimalFormat,
  decimals = 0,
): string => {
  rawNumber = rawNumber ? rawNumber : 0;
  let numberString = '';
  let scale = '';
  if (numberFormat === '1,234') {
    return `${parseFloat(rawNumber.toFixed(decimals))}`.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1,',
    );
  }

  if (isNaN(rawNumber) || !isFinite(rawNumber)) {
    numberString = 'N/A';
  } else {
    let absVal = Math.abs(rawNumber);
    if (absVal < 1000) {
      scale = '';
    } else if (absVal < 1000000) {
      scale = 'k';
      absVal /= 1000;
    } else if (absVal < 1000000000) {
      scale = 'm';
      absVal /= 1000000;
    } else if (absVal < 1000000000000) {
      scale = 'b';
      absVal /= 1000000000;
    } else if (absVal < Math.pow(10, 15)) {
      scale = 't';
      absVal /= Math.pow(10, 12);
    } else if (absVal < Math.pow(10, 18)) {
      scale = 'q';
      absVal /= Math.pow(10, 15);
    } else if (absVal < Math.pow(10, 21)) {
      scale = 'Q';
      absVal /= Math.pow(10, 18);
    }

    const decimals = getDecimalsByFormat(numberFormat);
    const dropTrailingZero: number = parseFloat(absVal.toFixed(decimals));
    numberString = dropTrailingZero + scale;
  }

  // preserve negative number
  return rawNumber < 0 ? `-${numberString}` : numberString;
};
export const getPrettyPointNumberString = (
  rawNumber: number,
  numberFormat: DecimalFormat,
  decimals = 0,
): string => {
  rawNumber = rawNumber ? rawNumber : 0;
  let numberString = '';
  let scale = '';
  if (numberFormat === '1,234') {
    return `${parseFloat(rawNumber.toFixed(decimals))}`.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1,',
    );
  }

  if (isNaN(rawNumber) || !isFinite(rawNumber)) {
    numberString = 'N/A';
  } else {
    let absVal = Math.abs(rawNumber);
    if (absVal < 1000) {
      scale = '';
    } else if (absVal < 1000000) {
      scale = 'triệu';
      absVal /= 1000;
    } else if (absVal < 1000000000) {
      scale = 'm';
      absVal /= 1000000;
    } else if (absVal < 1000000000000) {
      scale = 'b';
      absVal /= 1000000000;
    } else if (absVal < Math.pow(10, 15)) {
      scale = 't';
      absVal /= Math.pow(10, 12);
    } else if (absVal < Math.pow(10, 18)) {
      scale = 'q';
      absVal /= Math.pow(10, 15);
    } else if (absVal < Math.pow(10, 21)) {
      scale = 'Q';
      absVal /= Math.pow(10, 18);
    }

    const decimals = getDecimalsByFormat(numberFormat);
    const dropTrailingZero: number = parseFloat(absVal.toFixed(decimals));
    numberString = dropTrailingZero + scale;
  }

  // preserve negative number
  return rawNumber < 0 ? `-${numberString}` : numberString;
};
