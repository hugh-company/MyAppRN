import {
  fetchGamesTrending,
  fetchHomeData,
  fetchSearchData,
  RootState,
  setLoadingDashboard,
} from '@redux';
import {Spacing, useTheme} from '@theme';
import {ModuleItemInterface} from '@types';
import {useEffect, useState} from 'react';
import {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useHomeScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const {themeColors} = useTheme();
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = useState(false);
  const dispatch = useDispatch();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const loading = useSelector(
    (state: RootState) => state.dataLocalSlide.loading,
  );
  const homeData = useSelector((state: RootState) => state.dataLocalSlide.home);

  useEffect(() => {
    dispatch(setLoadingDashboard(true));
    dispatch(fetchHomeData());
    dispatch(fetchGamesTrending());
    // dispatch(fetchMoviesData());
    // dispatch(fetchComicsData());
    // dispatch(fetchGamesData());
    dispatch(fetchSearchData());
  }, []);

  useEffect(() => {
    if (homeData?.length > 0) {
      setData(homeData);
    }
  }, [homeData]);

  const onRefresh = () => {
    setIsReset(true);
  };

  useEffect(() => {
    if (isReset) {
      dispatch(fetchHomeData());
      setIsReset(false);
    }
  }, [isReset]);

  const bannerHeightStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, Spacing.height315],
      [Spacing.height315, top ? Spacing.height100 : Spacing.height50],
      Extrapolate.CLAMP,
    ),
  }));

  const headerBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, Spacing.height315],
      ['transparent', 'rgba(177, 6, 46, 0.6)'],
    ),
  }));
  return {
    data,
    themeColors,
    styles,
    scrollHandler,
    bannerHeightStyle,

    headerBackgroundColorStyle,
    onRefresh,
    loading,
    isReset,
  };
};
