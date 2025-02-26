import {useGamesDashboard} from '@services';
import {useTheme} from '@theme';
import {TabInterface, TypeKeyListApi} from '@types';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

export const useGameScreen = () => {
  const {themeColors} = useTheme();
  const dispatch = useDispatch();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });

  const [categories, setCategories] = useState<TabInterface[]>([]);

  const {
    data: dataDashboard,
    refetch,
    isLoading,
    isFetching,
    isSuccess,
  } = useGamesDashboard({
    filter: tabSelect ? `${tabSelect.type}__${tabSelect.id}` : '',
  });
  const games = isSuccess
    ? dataDashboard?.data?.modules?.filter(
        elm => elm.type !== TypeKeyListApi.TYPE_TABS,
      ) || []
    : [];

  useEffect(() => {
    if (dataDashboard?.data?.modules?.length ?? 0 > 0) {
      const category: any = dataDashboard?.data?.modules.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      setCategories(category?.items || []);
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
    } else {
    }
  }, [isSuccess]);

  useEffect(() => {
    if (tabSelect) {
      refetch();
    }
  }, [tabSelect, refetch]);

  const handleCategorySelect = (item: TabInterface) => {
    setTabSelect(item);
  };
  const onRefresh = () => {
    refetch();
  };
  return {
    games,
    styles,
    tabSelect,

    handleCategorySelect,

    categories,
    onRefresh,
    loading: isFetching || isLoading,
  };
};
