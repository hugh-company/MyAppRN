import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {FilterKey, PostTypeKey} from '@types';
import {t} from 'i18next';
import {debounce} from 'lodash';
import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyles} from './styles';

interface SearchInterface {
  type: PostTypeKey;
}

export const useSearchScreen = () => {
  const router = useRoute();
  const {type} = (router?.params as unknown as SearchInterface) || {
    type: undefined,
  };
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debouncedSetSearch = debounce(text => {
    setDebouncedSearch(text);
  }, 300);

  const [typeScreen, setTypeScreen] = useState<PostTypeKey | undefined>(type);
  const [sort, setSort] = useState<FilterKey | ''>('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const {top} = useSafeAreaInsets();
  const [isFilterSort, setIsFilterSort] = useState(false);
  const [isFilterType, setIsFilterType] = useState(false);
  console.log({typeScreen});
  useEffect(() => {
    if (type) {
      setTypeScreen(type);
    }
  }, [type]);
  const menuType = [
    {
      key: PostTypeKey.MOVIES,
      value: t('search.movie'),
    },
    {
      key: PostTypeKey.GAMES,
      value: t('search.game'),
    },
    {
      key: PostTypeKey.COMIC,
      value: t('search.chapter'),
    },
    {
      key: PostTypeKey.NOVEL,
      value: t('search.novel'),
    },
    {
      key: PostTypeKey.ALL,
      value: t('search.all'),
    },
  ];
  const menuSort = [
    {
      key: 'views__desc',
      value: t('search.viewer'),
    },
    {
      key: 'like_count__desc',
      value: t('search.likes'),
    },
    {
      key: 'created_at__desc',
      value: t('search.newest'),
    },

    {
      key: 'views_day__desc',
      value: t('search.viewDay'),
    },
    {
      key: 'views_week__desc',
      value: t('search.viewWeek'),
    },
    {
      key: 'rating_total__desc',
      value: t('search.viewRating'),
    },
  ];

  // filter

  const onSearch = (text: string) => {
    setSearch(text);
    debouncedSetSearch(text);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const filterByType = ({key}: {key: PostTypeKey}) => {
    setTypeScreen(key);
  };
  const filterBySort = ({key}: {key: FilterKey}) => {
    setSort(key);
  };

  // new
  const onClear = () => {
    setSort('');
    setTypeScreen(undefined);
    setSearch('');
  };
  return {
    themeColors,
    styles,
    typeScreen,
    setTypeScreen,
    top,
    search,
    onSearch,
    sort,
    setSort,
    menuType,
    menuSort,
    isFilterSort,
    setIsFilterSort,
    isFilterType,
    setIsFilterType,
    refSearch,
    filterBySort,
    filterByType,

    //
    onClear,
    debouncedSearch,
  };
};
