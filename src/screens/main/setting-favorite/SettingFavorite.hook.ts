import {navigate, SCREEN_ROUTE} from '@navigation';
import {getFavoriteSettingApi} from '@services';
import {useTheme} from '@theme';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useSettingFavorite = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<number[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    callApiGetFavorite();
  }, []);
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

  const onFavorite = () => {
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
