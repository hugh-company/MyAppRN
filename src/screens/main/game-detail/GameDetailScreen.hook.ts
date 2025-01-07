import {useRoute} from '@react-navigation/native';
import {getDetailPostApi} from '@services';
import {useTheme} from '@theme';
import {gameInterface, KeyHomeData} from '@types';
import {useEffect, useState} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';
interface GameDetailInterface {
  game: gameInterface;
}
export const useGameDetailScreen = () => {
  const router = useRoute();
  const {game} = router.params as GameDetailInterface;
  const [data, setData] = useState<gameInterface>(game);
  const {themeColors} = useTheme();
  const opacity = useSharedValue(0);
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);

  // Animated style for the overlay
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {duration: 500}),
  }));
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      const response: any = await getDetailPostApi(KeyHomeData.GAMES, game.id);

      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log({error});
      setLoading(false);
    }
  };
  return {data, themeColors, styles, loading};
};
