import {fetchGamesData, RootState} from '@redux';
import {Spacing, useTheme} from '@theme';
import {ModuleItemInterface, TabInterface, TypeKeyListApi} from '@types';
import {useEffect, useState} from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useGameScreen = () => {
  const {themeColors} = useTheme();
  const games = useSelector((state: RootState) => state.dataLocalSlide.games);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  const [data, setData] = useState<ModuleItemInterface[]>([]);
  const [categories, setCategories] = useState<TabInterface[]>([]);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (games?.length > 0) {
      setData(
        games?.filter(elm => elm.type !== TypeKeyListApi.TYPE_TABS) || [],
      );
      const category: any = games.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      setCategories(category?.items || []);
      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [games]);

  useEffect(() => {
    dispatch(fetchGamesData());
  }, []);

  const onRefresh = () => {
    dispatch(fetchGamesData());
  };
  const handleCategorySelect = (item: TabInterface) => {
    setTabSelect(item);
    const textFilter = `${item.type}__${item.id}`;
    dispatch(fetchGamesData({filter: textFilter}));
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

  return {
    games,
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
