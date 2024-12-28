import {categoryMovies, dashboardMovies} from '@services';
import {Spacing, useTheme} from '@theme';
import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {createStyles} from './styles';

export const useMovieScreen = () => {
  const [data, setData] = useState(dashboardMovies);
  const [dataCategory, setDataCategory] = useState([]);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [activeCategory, setActiveCategory] = useState(1);
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const inputSearchStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    height: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    }),
    marginTop: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [Spacing.width16, 0],
      extrapolate: 'clamp',
    }),
  };

  useEffect(() => {
    // fetch data
    setDataCategory(categoryMovies || []);
  }, []);
  const onSearch = (text: string) => {
    setSearch(text);
  };
  const onSelectedCategory = (id: number) => {
    setActiveCategory(id);
  };
  return {
    data,
    themeColors,
    styles,
    search,
    onSearch,
    activeCategory,
    onSelectedCategory,
    inputSearchStyle,
    scrollHandler,
    dataCategory,
  };
};
