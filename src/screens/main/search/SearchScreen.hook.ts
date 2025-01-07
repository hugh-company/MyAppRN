import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {PostTypeKey} from '@types';
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
  const [dataDashboard, setDataDashboard] = useState([]);
  const [data, setData] = useState([]);
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
  const [typeScreen, setTypeScreen] = useState(type);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
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
      key: 'views',
      value: t('search.viewer'),
    },
    {
      key: 'likes',
      value: t('search.likes'),
    },
  ];

  const onSearch = (text: string) => {
    setSearch(text);
  };
  const filterByType = ({key, value}: {key: PostTypeKey; value: string}) => {
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
    dataDashboard,
  };
};
