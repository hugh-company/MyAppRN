import {useRoute} from '@react-navigation/native';
import {getCategoryApi, getListPostApi} from '@services';
import {useTheme} from '@theme';
import {ItemListProduct, PostTypeKey, TabInterface, TypeList} from '@types';
import {navigateViewListProps} from '@utils';
import {t} from 'i18next';
import {useEffect, useRef, useState} from 'react';
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
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [categoriesList, setCategoriesList] = useState<TabInterface[]>([]);
  const [slugCategory, setSlugCategory] = useState<string>(keyCategory || '');
  const [isNext, setIsNext] = useState(true);
  const refFlatList = useRef<any>(null);
  const [sort, setSort] = useState('');
  //
  const [isFilter, setIsFilter] = useState(false);
  //
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
  const callApi = async (filter?: any) => {
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
      // if (filter) {
      //   params = {
      //     ...params,
      //     sortby: filter,
      //   };
      // }
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
  const filterBySort = (item: any) => {
    setSort(item.key);
    setPage(1);
    setIsNext(true);
    setList([]);
    setLoading(true);
    setIsFilter(false);
  };
  return {
    data,
    themeColors,
    styles,
    label,

    list,
    slugCategory,
    onLoadMore,

    onSelectedCategory,

    categoriesList,
    setCategoriesList,
    type,
    loading,
    refFlatList,
    isFilter,
    setIsFilter,
    menuSort,
    filterBySort,
    sort,
  };
};
