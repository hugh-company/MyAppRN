import {useRoute} from '@react-navigation/native';
import {getSavedApi} from '@services';
import {useTheme} from '@theme';
import {PostTypeKey} from '@types';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';
interface FavoriteScreenProps {
  type: PostTypeKey;
}
export const useFavoriteScreen = () => {
  const [loading, setLoading] = useState(true);
  const router = useRoute();
  const {type} = router.params as FavoriteScreenProps;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const callApi = async () => {
    try {
      const params: any = {
        paged: page,
      };
      const response: any = await getSavedApi(type, params);
      console.log({response: response?.data});

      if (!response?.data?.isNext) {
        setIsNext(response?.data?.isNext);
      }
      setData(prev =>
        page === 1 ? response?.data?.data : [...prev, ...response?.data?.data],
      );
      setLoading(false);
    } catch (error) {
      console.log({error});
      setIsNext(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  useEffect(() => {
    if (page > 1) {
      callApi();
    }
  }, [page]);
  const onLoadMore = () => {
    if (!isNext) {
      return;
    }
    if (loading) {
      return;
    }
    setPage(prev => prev + 1);
  };
  return {data, themeColors, styles, type, onLoadMore, loading};
};
