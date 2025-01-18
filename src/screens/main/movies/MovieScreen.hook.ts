import {getPostDashboardApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {
  ModuleItemInterface,
  PostTypeKey,
  TabInterface,
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

export const useMovieScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const [categories, setCategories] = useState<TabInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  const scrollY = useSharedValue(0);

  // Call Api
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async (filter?: string) => {
    try {
      const params = {
        filter: filter,
      };
      const response = await getPostDashboardApi(PostTypeKey.MOVIES, params);
      console.log({response});

      setData(
        response.data?.modules?.filter(
          elm => elm.type !== TypeKeyListApi.TYPE_TABS,
        ) || [],
      );

      const category: any = response.data?.modules.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      // console.log({tabSelect: tabSelect?.name});
      setCategories(category?.items || []);
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    if (refresh) {
      callApi();
    }
  }, [refresh]);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, Spacing.height50],
      [Spacing.height44, 0],
      Extrapolate.CLAMP,
    ),
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, Spacing.height50],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const onSelectedCategory = useCallback((item: TabInterface) => {
    setTabSelect(item);
    setLoading(true);
    const textFilter = `${item.type}__${item.id}`;
    callApi(textFilter);
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
    data,
    styles,
    search,
    tabSelect,
    heightStyle,
    handleCategorySelect,
    scrollHandler,
    onRefresh,
    loading,

    categories,
    scrollY,
    opacityStyle,
  };
};
