import {usePostType} from '@hooks';
import {
  getToken,
  setDataSetting,
  setIsDashboardDating,
  setUserInfo,
} from '@redux';
import {
  getDataDashboardApi,
  getUserProfileApi,
  responseDashboard,
} from '@services';
import {Spacing, useTheme} from '@theme';
import {ModuleItemInterface, UserInterface} from '@types';
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
  const [loading, setLoading] = useState(true);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const {callApiApiDashboard} = usePostType();
  useEffect(() => {
    setLoading(true);
    callApi();

    callApiApiDashboard();
  }, []);
  useEffect(() => {
    if (token) {
      callApiProfile();
    }
  }, [token]);
  const callApiProfile = async () => {
    try {
      const responseUser: any = await getUserProfileApi();
      console.log({responseUser});
      const userInfo = responseUser?.data?.me as UserInterface;
      const isShowDating =
        userInfo?.about_me && userInfo?.personal?.favorites?.length > 0;

      dispatch(setIsDashboardDating(isShowDating));
      dispatch(setUserInfo(responseUser?.data?.me));
    } catch (error) {}
  };
  const callApi = async () => {
    try {
      const res: responseDashboard = await getDataDashboardApi();
      console.log({res});

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
