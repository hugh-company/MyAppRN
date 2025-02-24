import {fetchMoviesData, RootState} from '@redux';
import {Spacing, useTheme} from '@theme';
import {ModuleItemInterface, TabInterface, TypeKeyListApi} from '@types';
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

export const useMovieScreen = () => {
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const [categories, setCategories] = useState<TabInterface[]>([]);
  const movies = useSelector((state: RootState) => state.dataLocalSlide.movies);
  const loadingDashboard = useSelector(
    (state: RootState) => state.dataLocalSlide.loading,
  );
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);

  const scrollY = useSharedValue(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movies?.length > 0) {
      setData(
        movies?.filter(elm => elm.type !== TypeKeyListApi.TYPE_TABS) || [],
      );
      const category: any = movies.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      setCategories(category?.items || []);
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
      setLoading(false);
    } else {
      // setLoading(true);
      dispatch(fetchMoviesData());
    }
  }, [movies]);
  // Call Api
  useEffect(() => {
    dispatch(fetchMoviesData());
  }, []);

  useEffect(() => {
    if (!loadingDashboard) {
      setLoading(false);
    }
  }, [loadingDashboard]);
  const onRefresh = () => {
    // setRefresh(true);
    let textFilter = '';
    if (tabSelect) {
      textFilter = `${tabSelect.type}__${tabSelect.id}`;
    }
    dispatch(fetchMoviesData({filter: textFilter}));
  };

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
    console.log({textFilter});

    dispatch(fetchMoviesData({filter: textFilter}));
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

    tabSelect,
    heightStyle,
    handleCategorySelect,
    scrollHandler,
    onRefresh,

    categories,
    scrollY,
    opacityStyle,
    loading,
  };
};
