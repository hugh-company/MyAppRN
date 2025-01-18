import {GlobalService} from '@components';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {getFavoriteUser, setUserInfo} from '@redux';
import {getFavoriteSettingApi, updateFavoriteApi} from '@services';
import {useTheme} from '@theme';
import {showNotificationSuccess} from '@utils';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useSettingFavorite = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<number[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  const favoritesUser = useSelector(getFavoriteUser);
  const dispatch = useDispatch();
  useEffect(() => {
    callApiGetFavorite();
    console.log({favoritesUser});
  }, []);
  useEffect(() => {
    if (favoritesUser) {
      setSelected(favoritesUser?.map(item => Number(item)));
    }
  }, [favoritesUser]);
  const callApiGetFavorite = async () => {
    try {
      const response: any = await getFavoriteSettingApi();
      console.log({response});
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log({error});
      setLoading(false);
    }
  };
  const onSelectFavorite = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const onFavorite = async () => {
    try {
      const favoritesUserIds = favoritesUser?.map(item => Number(item));
      if (JSON.stringify(favoritesUserIds) === JSON.stringify(selected)) {
        goToFilterDating();
        return;
      }
      GlobalService.showLoading();
      const response: any = await updateFavoriteApi({list: selected});
      console.log({response});
      showNotificationSuccess(
        t('user_info.titleSuccessUpdateUser'),
        t('user_info.dessuccessUpdateFavorite'),
      );
      dispatch(setUserInfo(response?.data));
      goToFilterDating();
    } catch (error) {
      console.log({error});
    } finally {
      GlobalService.hideLoading();
    }
  };
  const goToFilterDating = () => {
    navigate(SCREEN_ROUTE.FILTER_DATING);
  };
  return {
    data,
    themeColors,
    styles,
    selected,
    setSelected,
    onSelectFavorite,
    onFavorite,
    loading,
  };
};
