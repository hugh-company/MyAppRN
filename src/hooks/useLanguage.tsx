import { reset, SCREEN_ROUTE } from '@navigation';
import i18next from 'i18next';

const useLanguage = () => {
  const changeLanguage = (lng: string) => {

    i18next.changeLanguage(lng);

    reset(SCREEN_ROUTE.MAIN_STACK);
    // GlobalService.hideLoading();
  };
  return { changeLanguage };
};
export { useLanguage };
