import {useLocation} from '@hooks';
import {getToken} from '@redux';
import {useDatingDashboardApi} from '@services';
import {useTheme} from '@theme';
import {
  navHorizontalInterface,
  TypeDatingInterface,
  TypeTabDatingApi,
} from '@types';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useDatingScreen = () => {
  //
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [tab, setTab] = useState<TypeTabDatingApi>(TypeTabDatingApi.NEAR_YOU);
  const [tabNav, setTabNav] = useState<navHorizontalInterface[]>([]);
  const token = useSelector(getToken);
  const {
    checkPermissionLocation,
    isPermissionLocation,
    goToSettingLocation,
    getLocationDevice,
  } = useLocation();

  //
  const {
    data: dataDashboard,
    refetch,
    isRefetching,
    isLoading,
    isFetching,
    isSuccess,
    error,
  } = useDatingDashboardApi(tab);
  console.log({dataDashboard});

  useEffect(() => {
    if (dataDashboard?.data?.modules?.length ?? 0 > 0) {
      const category: any = dataDashboard?.data?.modules.find(
        item => item.type === TypeDatingInterface.TOP_NAV,
      );
      setTabNav(category?.items || []);
    } else {
    }
  }, [isSuccess]);
  useEffect(() => {
    if (tab) {
      refetch();
    }
  }, [tab, refetch]);
  const data = isSuccess
    ? dataDashboard?.data?.modules?.filter(
        item => item.type !== TypeDatingInterface.TOP_NAV,
      ) || []
    : [];
  useEffect(() => {
    if (token) {
      checkLocation();
    }
  }, [token]);
  useEffect(() => {
    if (error) {
      console.log({erroreeee: error});
    }
  }, [error]);
  const checkLocation = async () => {
    const check = await checkPermissionLocation();

    if (check) {
      const location = await getLocationDevice();
      console.log({location});
    }
  };

  const onSelectTab = (type: TypeTabDatingApi) => {
    setTab(type);
  };
  return {
    data,
    themeColors,
    styles,
    loading: isFetching || isLoading,
    tab,
    tabNav,
    onSelectTab,
    isPermissionLocation,
    goToSettingLocation,
    refetch,
    isRefetching,
  };
};
