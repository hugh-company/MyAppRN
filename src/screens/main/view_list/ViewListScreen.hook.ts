import {useRoute} from '@react-navigation/native';
import {getCategoryApi, getListPostApi} from '@services';
import {useTheme} from '@theme';
import {ItemListProduct, PostTypeKey, TabInterface} from '@types';
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
  const refModal = useRef<any>(null);

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
  const [sort, setSort] = useState(sortby);
  //
  const [isFilter, setIsFilter] = useState(false);
  //
  //   trending
  // last_updated
  // newest
  // likes
  // views
  const menuSort = [
    {
      key: 'views_day__desc',
      value: t('view_list.trending'),
    },
    {
      key: 'created_at__desc',
      value: t('view_list.newest'),
    },
    {
      key: 'updated_at__desc',
      value: t('view_list.last_update'),
    },

    {
      key: 'like_count__desc',
      value: t('view_list.likes'),
    },
    {
      key: 'views_week__desc',
      value: t('view_list.views'),
    },
    {
      key: 'rating_total__desc',
      value: t('view_list.rating'),
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
    if (slugCategory) {
      callApi();
      return;
    }
    if (sort) {
      callApi(sort);
    } else {
      callApi();
    }
  }, [slugCategory, sort]);
  //

  // call api category
  useEffect(() => {
    // if (data?.type === TypeList.CATEGORY) {
    callApiCategory();
  }, []);
  const callApiCategory = async () => {
    const responseCategory: any = await getCategoryApi(
      data?.posttype || PostTypeKey.MOVIES,
    );
    console.log({responseCategory});

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
      if (filter) {
        params = {
          ...params,
          sortby: filter,
        };
      }
      const response: any = await getListPostApi(
        data?.api || '',
        params,
        slugCategory,
      );
      console.log({response}, {params});

      setIsNext(response?.data?.is_next || false);
      //
      const newList =
        response?.data?.page === 1
          ? response?.data?.data
          : [...list, ...response?.data?.data];

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
    if (item?.key === '') {
      setSlugCategory(keyCategory || '');
      setSort(sortby); // Reset to the initial sortby value
      setPage(1);
      setIsNext(true);
      setLoading(true);
      setIsFilter(false);
      return;
    }
    setSort(item.key);
    setPage(1);
    setIsNext(true);
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
    sortby,
    refModal,
  };
};
