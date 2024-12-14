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
