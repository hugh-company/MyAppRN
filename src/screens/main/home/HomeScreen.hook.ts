import {setBaseURLApi} from '@api';
import {setGamesTrending, setStickers} from '@redux';
import {
  getListGamesTrendingApi,
  getStickerApi,
  useDashboardHome,
  useSearchDashboard,
} from '@services';
import {Spacing, useTheme} from '@theme';
import {useEffect} from 'react';
import {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

export const useHomeScreen = () => {
  const {themeColors} = useTheme();
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const {data, isSuccess, isLoading, isRefetching, refetch} =
    useDashboardHome();
  const {} = useSearchDashboard();
  useEffect(() => {
    if (data && isSuccess) {
      console.log('Data', data);
      setBaseURLApi();

      // dispatch()
    }
  }, [data, isSuccess]);
  useEffect(() => {
    getSticker();
    getGameTrending();
  }, []);
  const getSticker = async () => {
    try {
      const response: any = await getStickerApi();
      console.log('Response', response);
      dispatch(setStickers(response.data?.data));
    } catch (error) {
      console.log({error});
    }
  };
  const getGameTrending = async () => {
    try {
      const response: any = await getListGamesTrendingApi();
      console.log('Response', response);
      dispatch(setGamesTrending(response.data?.data));
    } catch (error) {
      console.log({error});
    }
  };
  const onRefresh = () => {
    refetch();
  };

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
    isRefetching,
    headerBackgroundColorStyle,
    onRefresh,
    isLoading,
  };
};
