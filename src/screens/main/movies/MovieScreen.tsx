import { AppCategoryList, AppInputSearch, AppListMovies, HeaderMain, HorizontalList, SliderList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { categoryMovies, favoriteMovies, movies, moviesAnimates } from '@services';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMovieScreen } from './MovieScreen.hook';
import { BannerMovie } from './components/BannerMovie';

const MovieScreen = () => {
  const { data, themeColors, styles, search, onSearch, activeCategory, onSelectedCategory,
    inputSearchStyle,
    scrollHandler,
  } = useMovieScreen();


  return (
    <View style={styles.container}>
      <HeaderMain title={t('movies.movieGood')} />
      <Animated.View style={[styles.inputSearch, inputSearchStyle]}>
        <AppInputSearch
          value={search}

          onChangeText={(text) => {
            onSearch(text);
          }}
        />
      </Animated.View>
      <AppCategoryList data={categoryMovies} categoryId={activeCategory} onSelectedCategory={onSelectedCategory} style={styles.category} listStyle={styles.listCategory} />

      {/* <AppFlatListAnimated data={[]} renderItem={renderItem} /> */}
      {activeCategory === 1 ? (
        <Animated.ScrollView style={styles.list} onScroll={scrollHandler} scrollEventThrottle={16}>
          <BannerMovie data={moviesAnimates} style={styles.banner} />
          <SliderList title={t('home.typeFavorite')} data={favoriteMovies} onViewMore={() => navigate(SCREEN_ROUTE.LIST_MOVIES, { type: '', name: t('home.typeFavorite') })} />

          <HorizontalList title={t('movies.movieHot')} type="chapters" data={movies} titleViewMore={t('home.viewAll')} onViewMore={() => { }} />
          <HorizontalList title={t('movies.tradingMovie')} type="chapters" data={movies} titleViewMore={t('home.viewAll')} onViewMore={() => { }} />
        </Animated.ScrollView>
      ) : (
        <Animated.View style={styles.listContainer}>
          <AppListMovies
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            data={movies}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default MovieScreen;
