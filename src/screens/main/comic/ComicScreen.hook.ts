import {getPostDashboardApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {
  ModuleItemInterface,
  PostTypeKey,
  TabsInterface,
  TypeKeyListApi,
} from '@types';
import {useCallback, useEffect, useState} from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';
export const useComicScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabsInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  // Call Api
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async (filter?: string) => {
    try {
      const params = {
        filter: filter,
      };
      const response = await getPostDashboardApi(PostTypeKey.COMIC, params);
      console.log('response', response);
      setData(response.data?.modules || []);
      const category: any = response.data?.modules.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      setLoading(false);
    }
  };
  //
  const onRefresh = () => {
    setRefresh(true);
  };
  useEffect(() => {
    if (refresh) {
      callApi();
    }
  }, [refresh]);
  //
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, Spacing.height50],
      [Spacing.height50, 0],
      Extrapolate.CLAMP,
    ),
  }));

  // action
  const onSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);
  const onSelectedCategory = useCallback((item: TabsInterface) => {
    setTabSelect(item);
    setLoading(true);
    const textFilter = `${item.type}/${item.id}`;
    callApi(textFilter);
  }, []);
  const handleSearchChange = useCallback(
    (text: string) => {
      onSearch(text);
    },
    [onSearch],
  );

  interface HandleCategorySelect {
    (item: TabsInterface): void;
  }

  const handleCategorySelect: HandleCategorySelect = useCallback(
    (item: TabsInterface) => {
      onSelectedCategory(item);
    },
    [onSelectedCategory],
  );

  return {
    data,
    styles,
    search,
    tabSelect,
    heightStyle,
    handleCategorySelect,
    scrollHandler,
    onRefresh,
    loading,
    handleSearchChange,
  };
};
