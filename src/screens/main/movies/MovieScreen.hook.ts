import {useMoviesDashboard} from '@services';
import {useTheme} from '@theme';
import {TabInterface, TypeKeyListApi} from '@types';
import {useCallback, useEffect, useState} from 'react';
import {createStyles} from './styles';

export const useMovieScreen = () => {
  const [categories, setCategories] = useState<TabInterface[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });

  const {
    data: dataDashboard,
    refetch,
    isLoading,
    isFetching,
    isSuccess,
  } = useMoviesDashboard({
    filter: tabSelect ? `${tabSelect.type}__${tabSelect.id}` : '',
  });
  const movies = isSuccess
    ? dataDashboard?.data?.modules?.filter(
        elm => elm.type !== TypeKeyListApi.TYPE_TABS,
      ) || []
    : [];
  // const categories=dataDashboard?.data?.modules.find(
  //   item => item.type === TypeKeyListApi.TYPE_TABS,
  // );
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

  const onRefresh = () => {
    refetch();
  };

  const onSelectedCategory = useCallback((item: TabInterface) => {
    setTabSelect(item);
  }, []);

  interface HandleCategorySelect {
    (item: TabInterface): void;
  }

  const handleCategorySelect: HandleCategorySelect = useCallback(
    (item: TabInterface) => {
      onSelectedCategory(item);
    },
    [onSelectedCategory],
  );

  return {
    movies,
    styles,
    tabSelect,

    handleCategorySelect,

    onRefresh,
    categories,

    loading: isFetching || isLoading,
  };
};
