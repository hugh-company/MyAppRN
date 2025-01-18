import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMovieScreen } from './MovieScreen.hook';

const MovieScreen = () => {
  const { data,
    styles,
    opacityStyle,
    tabSelect,
    heightStyle,
    handleCategorySelect,
    scrollHandler,
    onRefresh,
    loading,
    categories,
  } = useMovieScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('movies.movieGood')} type={PostTypeKey.MOVIES} />
      <Animated.View style={[styles.header, heightStyle, opacityStyle]}>
        <AppInputSearch
          value={''}
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: ItemListDashboard.MOVIES })}
          editable={false}
          style={styles.inputSearch}
        />
      </Animated.View>
      <AppCategoryList data={categories} categoryId={tabSelect?.id} onSelectedCategory={handleCategorySelect} />
      <AppListDashboard
        data={data}
        onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}

        typeScreen={ItemListDashboard.MOVIES}
      />
    </View>
  );
};

export default MovieScreen;
