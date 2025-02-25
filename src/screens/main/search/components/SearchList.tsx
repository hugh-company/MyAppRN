import { AppListMovies, LoadingList } from '@components';
import { paramSearchInterface, searchApi } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { FilterKey, ItemListProduct, PostTypeKey } from '@types';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface SearchListProps {
  valueSearch?: string,
  sort: FilterKey | string,
  typeScreen: PostTypeKey | undefined,
}

const SearchList = ({ valueSearch, typeScreen, sort }: SearchListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const [searchData, setSearchData] = useState<ItemListProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    if (typeScreen !== undefined || sort !== '' || valueSearch !== '') {
      setLoading(true);
      setCanLoadMore(true);
    }
  }, [typeScreen, sort, valueSearch]);

  useEffect(() => {
    console.log({ loading, page });

    if (loading) {
      setPage(1);

      callApiSearch({
        search: valueSearch,
        typeScreen,
        sort,
        paged: 1,
      });
    }
  }, [loading]);

  useEffect(() => {
    console.log({ page });

    if (page > 1 && !loading) {
      callApiSearch({
        search: valueSearch,
        typeScreen,
        sort,
        paged: page,
      });
    }
  }, [page]);

  const onLoadMore = () => {
    if (!canLoadMore || loading) {
      return;
    }

    setPage(prev => prev + 1);
  };

  const callApiSearch = async (filter?: {
    search?: string;
    typeScreen?: PostTypeKey;
    sort?: string;
    paged?: number;
  }) => {
    console.log({ filter }, canLoadMore, page, searchData);
    setLoading(false);
    if (!canLoadMore) {

      return;
    }
    try {
      const params: paramSearchInterface = {
        paged: filter?.paged || page,
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


      const responseSearch: any = await searchApi(params);
      console.log({ responseSearch }, { params });
      setCanLoadMore(responseSearch.data?.is_next || false);
      setSearchData(prevData => params?.paged === 1 ? responseSearch.data?.data || [] : [...prevData, ...responseSearch.data?.data || []]);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setSearchData([]);
      setLoading(false);

    }
  };
  if (loading) {
    return (
      <LoadingList numColumns={2} />
    );
  }

  return (
    <View style={styles.container}>
      <AppListMovies
        numColumns={2}
        scrollEventThrottle={16}
        data={searchData}
        isLoading={loading}
        keyExtractor={(item, index) => `search_list_${item?.id || index}`}
        onLoadMore={onLoadMore}
        isLoadMore={canLoadMore}
      />
    </View>
  );
};

export default memo(SearchList);

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    list: {
      marginHorizontal: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width18,
    },
    imageNotFound: {
      width: Spacing.width200,
      height: Spacing.width100,
    },
    empty: {
      paddingVertical: Spacing.height42,
      alignItems: 'center',
      gap: Spacing.width16,
    },
    txtEmpty: {
      color: themeColors.subtile,
    },
  });
