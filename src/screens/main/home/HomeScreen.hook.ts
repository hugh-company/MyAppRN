import {Spacing, useTheme} from '@theme';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useDashboardHomeApi} from '../../../hooks/useHomeApi';
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

  const {data, isSuccess, isLoading, isRefetching, refetch, isError} =
    useDashboardHomeApi();

  const onRefresh = () => {
    refetch();
  };

  const bannerHeightStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, Spacing.height215],
      [Spacing.height215, top ? Spacing.height100 : Spacing.height50],
      Extrapolate.CLAMP,
    ),
  }));
  return {
    data,
    themeColors,
    styles,
    scrollHandler,
    bannerHeightStyle,
    isRefetching,
    onRefresh,
    isLoading,
    isError,
  };
};
