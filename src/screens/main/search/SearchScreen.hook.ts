import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {TypeListMovie} from '@types';
import {t} from 'i18next';
import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyles} from './styles';
interface SearchInterface {
  type:
    | TypeListMovie.CHAPTERS
    | TypeListMovie.GAMES
    | TypeListMovie.MOVIES
    | undefined;
}

export const useSearchScreen = () => {
  const router = useRoute();

  const {type} = (router?.params as unknown as SearchInterface) || {
    type: undefined,
  };
  const [data, setData] = useState([]);
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [typeScreen, setTypeScreen] = useState(type);
  const [sort, setSort] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const {top} = useSafeAreaInsets();
  const [isFilterSort, setIsFilterSort] = useState(false);
  const [isFilterType, setIsFilterType] = useState(false);
  const menuType = [
    {
      key: TypeListMovie.MOVIES,
      value: t('search.movie'),
    },
    {
      key: TypeListMovie.GAMES,
      value: t('search.game'),
    },
    {
      key: TypeListMovie.CHAPTERS,
      value: t('search.chapter'),
    },
  ];
  const menuSort = [
    {
      key: 'views',
      value: t('search.viewer'),
    },
    {
      key: 'likes',
      value: t('search.likes'),
    },
  ];
  useEffect(() => {
    if (refSearch.current) {
      setTimeout(() => {
        refSearch.current?.focus();
      }, 500);
    }
  }, [refSearch]);
  const onSearch = (text: string) => {
    setSearch(text);
  };
  const filterByType = ({
    key,
    value,
  }: {
    key: TypeListMovie.CHAPTERS | TypeListMovie.GAMES | TypeListMovie.MOVIES;
    value: string;
  }) => {
    setTypeScreen(key);
  };
  const filterBySort = ({key, value}: {key: string; value: string}) => {
    setTypeScreen(key);
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
  };
};
