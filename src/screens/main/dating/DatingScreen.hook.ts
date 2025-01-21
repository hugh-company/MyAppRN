import {useLocation} from '@hooks';
import {getToken} from '@redux';
import {getDatingDashboardApi} from '@services';
import {useTheme} from '@theme';
import {
  ModuleDating,
  navHorizontalInterface,
  responseDatingNearYou,
  TypeDatingInterface,
  TypeTabDatingApi,
} from '@types';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useDatingScreen = () => {
  const [data, setData] = useState<ModuleDating[]>([]);
  const {themeColors} = useTheme();
  const [loading, setLoading] = useState(true);
  const styles = createStyles(themeColors);
  const [tab, setTab] = useState<TypeTabDatingApi>(TypeTabDatingApi.NEAR_YOU);
  const [tabNav, setTabNav] = useState<navHorizontalInterface[]>([]);
  const token = useSelector(getToken);
  const {checkPermissionLocation, isPermissionLocation, goToSettingLocation} =
    useLocation();
  useEffect(() => {
    setLoading(true);
    callApi(tab);
  }, [tab]);
  useEffect(() => {
    if (token) {
      checkLocation();
    }
  }, [token]);
  const checkLocation = async () => {
    const check = await checkPermissionLocation();
    console.log({check});
  };
  const callApi = async (type: TypeTabDatingApi) => {
    try {
      const response: responseDatingNearYou = await getDatingDashboardApi(type);
      console.log({response});
      const menus: navHorizontalInterface[] =
        response.data.modules.find(
          item => item.type === TypeDatingInterface.TOP_NAV,
        )?.items || [];
      setTabNav(menus);
      setData(
        response.data.modules?.filter(
          item => item.type !== TypeDatingInterface.TOP_NAV,
        ) || [],
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onSelectTab = (type: TypeTabDatingApi) => {
    setTab(type);
  };
  return {
    data,
    themeColors,
    styles,
    loading,
    tab,
    tabNav,
    onSelectTab,
    isPermissionLocation,
    goToSettingLocation,
  };
};
