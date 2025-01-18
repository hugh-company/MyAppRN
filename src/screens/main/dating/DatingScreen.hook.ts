import {getDatingDashboardApi} from '@services';
import {useTheme} from '@theme';
import {
  ModuleDating,
  navHorizontalInterface,
  responseDatingNearYou,
  TypeDatingInterface,
  TypeOptionsDating,
} from '@types';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useDatingScreen = () => {
  const [data, setData] = useState<ModuleDating[]>([]);
  const {themeColors} = useTheme();
  const [loading, setLoading] = useState(true);
  const styles = createStyles(themeColors);
  const [tab, setTab] = useState<TypeOptionsDating>(TypeOptionsDating.NEAR_YOU);
  const [tabNav, setTabNav] = useState<navHorizontalInterface[]>([]);
  useEffect(() => {
    setLoading(true);
    callApi(tab);
  }, [tab]);
  const callApi = async (type: string) => {
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
  const onSelectTab = (type: TypeOptionsDating) => {
    setTab(type);
  };
  return {data, themeColors, styles, loading, tab, tabNav, onSelectTab};
};
