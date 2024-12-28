import {dataDashboardChapters} from '@services';
import {Spacing, useTheme} from '@theme';
import {useState} from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';

export const useChapterScreen = () => {
  const [data, setData] = useState(dataDashboardChapters);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [search, setSearch] = useState('');
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 100], [100, 50], Extrapolate.CLAMP),
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, Spacing.height315],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const onSearch = (text: string) => {
    setSearch(text);
  };
  return {
    data,
    themeColors,
    styles,
    scrollHandler,
    heightStyle,
    opacityStyle,
    search,
    onSearch,
  };
};
