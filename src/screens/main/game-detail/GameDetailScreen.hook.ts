import {useRoute} from '@react-navigation/native';
import {addHistoryItem} from '@redux';
import {useDetailPostApi, viewsPostApi} from '@services';
import {useTheme} from '@theme';
import {detailPostInterface, PostTypeKey} from '@types';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

interface GameDetailInterface {
  game: detailPostInterface;
}
export const useGameDetailScreen = () => {
  const router = useRoute();
  const {game} = router.params as GameDetailInterface;
  const {themeColors} = useTheme();
  const dispatch = useDispatch();

  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  const {data, isSuccess, refetch, isRefetching, error} = useDetailPostApi(
    game?.id,
    PostTypeKey.GAMES,
  );
  console.log({data}, {error});

  useEffect(() => {
    if (game?.id) {
      callApiView();
    }
  }, [game?.id]);
  const callApiView = async () => {
    try {
      const res = await viewsPostApi(game?.id, PostTypeKey.GAMES);
      console.log({res});
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    if (game) {
      dispatch(
        addHistoryItem({
          ...game,
          posttype: PostTypeKey.GAMES,
          timestamp: Date.now(),
        }),
      );
    }
  }, [game]);

  useEffect(() => {
    console.log('Entered GameDetailScreen');
  }, []);

  return {
    dataGame: data?.data,
    isSuccess,
    themeColors,
    styles,
    loading,
    refetch,
    isRefetching,
  };
};
