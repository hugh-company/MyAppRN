import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useMovieScreen } from './MovieScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data && prevProps.loading === nextProps.loading;
});

const MovieScreen = () => {
  const { data,
    styles,

    scrollHandler,
    handleCategorySelect,
    tabSelect,
    onRefresh,
    categories, loading,
  } = useMovieScreen();


  return (
    <View style={styles.container}>
      <HeaderMain title={t('movies.movieGood')} type={PostTypeKey.MOVIES} />

      <AppInputSearch
        onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: ItemListDashboard.MOVIES })}
        editable={false}
        style={styles.inputSearch}
      />

      <AppCategoryList
        contentContainerStyle={styles.category}
        data={categories}
        categoryId={tabSelect?.id}
        onSelectedCategory={handleCategorySelect} />
      <MemoizedAppListDashboard
        data={data}
        onScroll={scrollHandler}
        key={'movie_dashboard'}
        loading={loading}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => `movie_dashboard_${index}`}
        typeScreen={ItemListDashboard.MOVIES}
      />
    </View>
  );
};

export default MovieScreen;
