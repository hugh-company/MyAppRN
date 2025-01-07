import {useRoute} from '@react-navigation/native';
import {getListPostApi} from '@services';
import {useTheme} from '@theme';
import {chapterInterface, PostTypeKey, TypeList} from '@types';
import {useEffect, useState} from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';

interface ViewListScreenProps {
  name: string;
  type: PostTypeKey;
  typeList: TypeList;
  categories?: {id: number; name: string}[];
  categoryIdSelected?: number;
}

export const useViewListScreen = () => {
  // router name , type, params
  const router = useRoute();
  const {name, type, categories, categoryIdSelected} =
    router?.params as unknown as ViewListScreenProps;
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<chapterInterface[]>([]);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [categoriesList, setCategoriesList] = useState(categories || []);
  const [activeCategory, setActiveCategory] = useState(categoryIdSelected);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const onSelectedCategory = (id: number) => {
    setActiveCategory(id);
  };
  // callapi
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      let params: any = {
        page: 1,
        limit: 10,
      };
      if (activeCategory) {
        params = {
          ...params,
          sort: `tags/${activeCategory}`,
        };
      }
      console.log({params});

      const response: any = await getListPostApi(type);
      console.log({list: response?.data?.data});
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log({error});

      setLoading(false);
    }
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
    loading,
  };
};
