import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {gameInterface} from '@types';
import {useState} from 'react';
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

  // Animated style for the overlay
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {duration: 500}),
  }));
  const showDetails = () => {
    opacity.value = 1; // Show overlay
  };

  const hideDetails = () => {
    opacity.value = 0; // Hide overlay
  };
  return {data, themeColors, styles};
};
