import { AsyncStorage } from '@utils';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi } from './locales';

type languageDetectorType = {
  type:
  | 'backend'
  | 'logger'
  | 'languageDetector'
  | 'postProcessor'
  | 'i18nFormat'
  | 'formatter'
  | '3rdParty';
  async: boolean;
  detect: (cb: (value: string) => void) => void;
  init: () => void;
  cacheUserLanguage: (lng: string) => void;
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async (cb: (value: string) => void) => {
    const savedLanguage = await AsyncStorage.getString('user-language');
    cb(savedLanguage || 'vi');
    return savedLanguage;
  },
  init: () => {
    console.log('INIT_LANG');
  },
  cacheUserLanguage: async (lng: string) => {
    await AsyncStorage.set('user-language', lng);
    console.log('INIT_CACHE_LANGUAGE');
  },
};

export const defaultNS = 'common';
export const resources = {
  en,
  vi,
} as const;

const ns = [...Object.keys(en)];

const initI18n = () => {
  return i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'vi',
      debug: true,
      resources: {
        en: { common: en },
        vi: { common: vi },
      },
      ns,
      defaultNS,
    });
};

export { initI18n };

