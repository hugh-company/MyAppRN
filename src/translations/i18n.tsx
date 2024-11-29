import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, vi} from './locales';
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
  cacheUserLanguage: () => void;
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: (cb: (value: string) => void) => cb('en'),
  init: () => {
    console.log('INIT_LANG');
  },
  cacheUserLanguage: () => {
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
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: true,
      resources: {
        en: {common: en},
        vi: {common: vi},
      },
      ns,
      defaultNS,
    });
};

export {initI18n};
