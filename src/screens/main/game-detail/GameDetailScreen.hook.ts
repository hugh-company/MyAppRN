import {useRoute} from '@react-navigation/native';
import {useDetailPostApi, viewsPostApi} from '@services';
import {useTheme} from '@theme';
import {detailPostInterface, PostTypeKey} from '@types';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';
interface GameDetailInterface {
  game: detailPostInterface;
}
export const useGameDetailScreen = () => {
  const router = useRoute();
  const {game} = router.params as GameDetailInterface;
  const {themeColors} = useTheme();

  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  const {data, isSuccess, refetch, isRefetching, error} = useDetailPostApi(
    game?.id,
    PostTypeKey.GAMES,
  );
  useEffect(() => {
    if (game?.id) {
      viewsPostApi(game?.id, PostTypeKey.GAMES);
    }
  }, [game?.id]);
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
