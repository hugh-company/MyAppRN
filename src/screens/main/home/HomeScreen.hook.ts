import {usePostType} from '@hooks';
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
import {createStyles} from './styles';

export const useHomeScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const {themeColors} = useTheme();
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const {callApiApiDashboard, callApiHome} = usePostType();
  useEffect(() => {
    setLoading(true);
    callApi();
    callApiApiDashboard();
  }, []);

  const callApi = async () => {
    try {
      const response = await callApiHome();
      const dataHome = response?.data?.modules || [];
      setData(dataHome);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setIsReset(true);
  };
  useEffect(() => {
    if (isReset) {
      callApi();
      callApiApiDashboard();
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
