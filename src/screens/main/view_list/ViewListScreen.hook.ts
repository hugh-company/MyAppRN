import {useRoute} from '@react-navigation/native';
import {getCategoryApi, getListPostApi} from '@services';
import {useTheme} from '@theme';
import {ItemListProduct, PostTypeKey, TabInterface, TypeList} from '@types';
import {navigateViewListProps} from '@utils';
import {useEffect, useRef, useState} from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';

export const useViewListScreen = () => {
  // router name , type, params
  const router = useRoute();
  const {label, keyCategory, type, data, paged, sortby} =
    router?.params as unknown as navigateViewListProps;
  //
  console.log({label, keyCategory, type, data, paged, sortby});

  //
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(paged || 1);
  const [list, setList] = useState<ItemListProduct[]>([]);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [categoriesList, setCategoriesList] = useState<TabInterface[]>([]);
  const [slugCategory, setSlugCategory] = useState<string>(keyCategory || '');
  const scrollY = useSharedValue(0);
  const [isNext, setIsNext] = useState(true);
  const refFlatList = useRef<any>(null);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const onSelectedCategory = (item: TabInterface) => {
    if (item.slug === slugCategory) {
      if (refFlatList.current) {
        refFlatList.current.scrollToOffset({offset: 0});
      }
      return;
    } else {
      setSlugCategory(item?.slug);
      setPage(1);
      setIsNext(true);
      setList([]);
      setLoading(true);
    }
  };
  // callapi
  useEffect(() => {
    callApi();
  }, [slugCategory]);
  //

  // call api category
  useEffect(() => {
    if (data?.type === TypeList.CATEGORY) {
      callApiCategory();
    }
  }, [data?.type]);
  const callApiCategory = async () => {
    const responseCategory: any = await getCategoryApi(
      data?.posttype || PostTypeKey.MOVIES,
    );
    setCategoriesList(responseCategory?.data);
  };
  //
  const callApi = async () => {
    if (!isNext) {
      setLoading(false);
      return;
    }
    try {
      let params: any = {
        paged: page,
      };
      if (sortby) {
        params = {
          ...params,
          sortby: sortby,
        };
      }

      const response: any = await getListPostApi(
        data?.api || '',
        params,
        slugCategory,
      );
      console.log({response});

      setIsNext(response?.data?.is_next || false);
      //
      const newList = [...list, ...response?.data?.data];

      setList(newList);
      setLoading(false);
    } catch (error) {
      console.log({error});

      setLoading(false);
    }
  };
  const onSearch = (text: string) => {
    setSearch(text);
  };
  // load more
  useEffect(() => {
    if (page > 1) {
      callApi();
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
    label,
    search,
    onSearch,
    list,
    slugCategory,
    onLoadMore,
    scrollHandler,
    onSelectedCategory,
    scrollY,
    categoriesList,
    setCategoriesList,
    type,
    loading,
    refFlatList,
  };
};
