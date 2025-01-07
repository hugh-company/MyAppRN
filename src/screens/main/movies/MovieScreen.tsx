import { AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { ItemListDashboard } from '@types';
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
      <HeaderMain title={t('movies.movieGood')} />
      <Animated.View style={[styles.inputSearch, heightStyle]}>
        <AppInputSearch
          value={search}
          onChangeText={handleSearchChange}
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
