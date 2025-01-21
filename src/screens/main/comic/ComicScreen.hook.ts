import {getComicsModuleLocal, setComics} from '@redux';
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
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';
export const useComicScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const [categories, setCategories] = useState<TabInterface[]>([]);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const scrollY = useSharedValue(0);
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const comics = useSelector(getComicsModuleLocal);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  useEffect(() => {
    if (comics?.length > 0) {
      setData(
        comics?.filter(elm => elm.type !== TypeKeyListApi.TYPE_TABS) || [],
      );

      const category: any = comics.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      // console.log({tabSelect: tabSelect?.name});
      setCategories(category?.items || []);
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
    } else {
      setLoading(true);
    }
  }, [comics]);
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
      dispatch(setComics(response.data?.modules || []));
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

  // action
  const onSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);
  const onSelectedCategory = useCallback((item: TabInterface) => {
    setTabSelect(item);
    setLoading(true);
    const textFilter = `${item.type}__${item.id}`;
    callApi(textFilter);
  }, []);
  const handleSearchChange = useCallback(
    (text: string) => {
      onSearch(text);
    },
    [onSearch],
  );

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
    handleSearchChange,
    opacityStyle,
    categories,
  };
};
