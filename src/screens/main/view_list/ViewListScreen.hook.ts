import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {chapterInterface} from '@types';
import {useState} from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';

interface ViewListScreenProps {
  name: string;
  type: 'chapters' | 'movies' | 'games';
  typeList: 'category' | 'list';
  list: chapterInterface[];
  categories?: {id: number; name: string}[];
}

export const useViewListScreen = () => {
  // router name , type, params
  const router = useRoute();
  const {name, type, list, categories} =
    router?.params as unknown as ViewListScreenProps;
  console.log({list}, {categories});

  const [data, setData] = useState<chapterInterface[]>(list || []);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [categoriesList, setCategoriesList] = useState(categories || []);
  const [activeCategory, setActiveCategory] = useState(1);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const onSelectedCategory = (id: number) => {
    setActiveCategory(id);
  };

  const onSearch = (text: string) => {
    setSearch(text);
  };
  return {
    data,
    themeColors,
    styles,
    name,
    search,
    onSearch,
    activeCategory,
    setActiveCategory,
    scrollHandler,
    onSelectedCategory,
    scrollY,
    categoriesList,
    setCategoriesList,
    type,
  };
};
