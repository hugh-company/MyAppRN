import {useRoute} from '@react-navigation/native';
import {getDetailPostApi} from '@services';
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
  const [data, setData] = useState<detailPostInterface>(game);
  const {themeColors} = useTheme();

  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      const response: any = await getDetailPostApi(PostTypeKey.GAMES, game.id);

      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log({error});
      setLoading(false);
    }
  };
  return {data, themeColors, styles, loading};
};
