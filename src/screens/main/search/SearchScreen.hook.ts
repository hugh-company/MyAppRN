import {useRoute} from '@react-navigation/native';
import {paramSearchInterface, searchApi} from '@services';
import {useTheme} from '@theme';
import {FilterKey, ItemListProduct, PostTypeKey} from '@types';
import {t} from 'i18next';
import {debounce} from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';
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
  const [data, setData] = useState<ItemListProduct[]>([]);
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [typeScreen, setTypeScreen] = useState(type);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<FilterKey | ''>('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const {top} = useSafeAreaInsets();
  const [isFilterSort, setIsFilterSort] = useState(false);
  const [isFilterType, setIsFilterType] = useState(false);
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
  ];

  const callApiSearch = async (filter?: {
    search?: string;
    typeScreen?: PostTypeKey;
    sort?: string;
  }) => {
    if (!isNext) {
      setLoading(false);
      return;
    }

    try {
      const params: paramSearchInterface = {
        paged: page,
      };
      if (filter?.search) {
        params.q = filter.search;
      }
      if (filter?.typeScreen) {
        params.filter = `posttype__${typeScreen}`;
      }
      if (filter?.sort) {
        params.sortby = sort;
      }
      console.log({params});

      const responseSearch = await searchApi(params);
      console.log({responseSearch});

      setData(responseSearch.data?.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      setIsNext(true);
      setPage(1);
    }
  }, [loading]);
  // filter
  useEffect(() => {
    if (typeScreen !== undefined || sort !== '') {
      setLoading(true);
      callApiSearch({
        search,
        typeScreen,
        sort,
      });
    }
  }, [typeScreen, sort]);
  // search use debounce
  const debounceSearch = useCallback(
    (text: string) => {
      debounce(() => {
        callApiSearch({
          search: text,
          typeScreen,
          sort,
        });
      }, 1000)();
    },
    [typeScreen, sort],
  );

  const onSearch = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  };
  const filterByType = ({key}: {key: PostTypeKey}) => {
    setLoading(true);
    setTypeScreen(key);
  };
  const filterBySort = ({key}: {key: FilterKey}) => {
    setLoading(true);
    setSort(key);
  };
  useEffect(() => {
    if (page > 1) {
      callApiSearch({
        search,
        typeScreen,
        sort,
      });
    }
  }, [page]);
  const onLoadMore = () => {
    if (!isNext) {
      return;
    }
    if (loading) {
      return;
    }
    setPage(prev => prev + 1);
  };
  return {
    data,
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
    loading,
    onLoadMore,
  };
};
