import {setDataSetting} from '@redux';
import {
  getDataDashboardApi,
  getUserProfileApi,
  responseDashboard,
} from '@services';
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
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

export const useHomeScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const {themeColors} = useTheme();
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    setLoading(true);
    callApi();
    callApiProfile();
  }, []);
  const callApiProfile = async () => {
    try {
      const responseUser = await getUserProfileApi();
      console.log({responseUser});
    } catch (error) {}
  };
  const callApi = async () => {
    try {
      const res: responseDashboard = await getDataDashboardApi();
      console.log({res: res?.data});
      dispatch(
        setDataSetting({
          notices: res?.data?.notices || [],
          bottomNavigation: res?.data?.navbar || [],
          dataDrawer: res?.data?.menus || [],
        }),
      );

      setData(res?.data?.modules || []);
      setLoading(false);
    } catch (error) {
      // console.log({error});
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setIsReset(true);
  };
  useEffect(() => {
    if (isReset) {
      callApi();
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
      ['transparent', '#B1062E'],
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
