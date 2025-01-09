import {getPostDashboardApi} from '@services';
import {useTheme} from '@theme';
import {
  ModuleItemInterface,
  PostTypeKey,
  TabInterface,
  TypeKeyListApi,
} from '@types';
import {useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useGameScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const {themeColors} = useTheme();
  const [loading, setLoading] = useState(true);
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async (filter?: string) => {
    try {
      const params = {
        filter: filter,
      };
      const response = await getPostDashboardApi(PostTypeKey.GAMES, params);
      console.log({response});

      setData(response.data?.modules || []);

      const category: any = response.data?.modules.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      // console.log({tabSelect: tabSelect?.name});

      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onRefresh = () => {
    callApi();
  };
  const handleCategorySelect = (item: TabInterface) => {
    setTabSelect(item);
  };
  return {
    data,
    themeColors,
    styles,
    loading,
    onRefresh,
    tabSelect,
    handleCategorySelect,
  };
};
