import { AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { Animated, View } from 'react-native';
import { useMovieScreen } from './MovieScreen.hook';

const MovieScreen = () => {
  const { data,
    styles,
    search,
    tabSelect,
    heightStyle,
    handleCategorySelect,
    scrollHandler,
    onRefresh,
    loading,
    handleSearchChange,
  } = useMovieScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('movies.movieGood')} type={PostTypeKey.MOVIES} />
      <Animated.View style={[styles.inputSearch, heightStyle]}>
        <AppInputSearch
          value={''}
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: ItemListDashboard.MOVIES })}
          editable={false}
        />
      </Animated.View>
      <AppListDashboard
        data={data}
        onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}
        categoryId={tabSelect?.id}
        onSelectedCategory={handleCategorySelect}
        typeScreen={ItemListDashboard.MOVIES}
      />
    </View>
  );
};

export default MovieScreen;
