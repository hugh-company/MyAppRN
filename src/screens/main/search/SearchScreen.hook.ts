import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {FilterKey, PostTypeKey} from '@types';
import {t} from 'i18next';
import {useRef, useState} from 'react';
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

  const [typeScreen, setTypeScreen] = useState<PostTypeKey | undefined>(type);
  const [sort, setSort] = useState<FilterKey | ''>('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

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

  // filter

  const onSearch = (text: string) => {
    setSearch(text);
  };
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
  };
};
