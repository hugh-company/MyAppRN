import {useRoute} from '@react-navigation/native';
import {Spacing, useTheme} from '@theme';
import {useState} from 'react';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';

interface ListMovieScreenProps {
  name: string;
  type: string;
}

export const useListMovieScreen = () => {
  // router name , type, params
  const router = useRoute();
  const {name, type} = router?.params as unknown as ListMovieScreenProps;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [activeCategory, setActiveCategory] = useState(1);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const onSelectedCategory = (id: number) => {
    setActiveCategory(id);
  };
  const inputSearchStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scrollY.value > 50 ? 0 : 1, {duration: 300}),
      height: withTiming(scrollY.value > 50 ? 0 : 50, {duration: 300}),
      marginTop: withTiming(scrollY.value > 50 ? 0 : Spacing.width16, {
        duration: 300,
      }),
    };
  });
  const onSearch = (text: string) => {
    setSearch(text);
  };
  return {
    data,
    themeColors,
    styles,
    name,
    search,
    onSearch,
    activeCategory,
    setActiveCategory,
    inputSearchStyle,
    scrollHandler,
    onSelectedCategory,
  };
};
