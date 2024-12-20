import { AppCategoryList, AppInputSearch, AppListMovies, HeaderMain, HorizontalList, SliderList } from '@components';
import { categoryMovies, favoriteMovies, movies, moviesAnimates } from '@services';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useMovieScreen } from './MovieScreen.hook';
import { BannerMovie } from './components/BannerMovie';

const MovieScreen = () => {
  const { data, themeColors, styles, search, onSearch, activeCategory, onSelectedCategory } = useMovieScreen();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const inputSearchStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scrollY.value > 50 ? 0 : 1, { duration: 300 }),
      height: withTiming(scrollY.value > 50 ? 0 : 50, { duration: 300 }),
      marginTop: withTiming(scrollY.value > 50 ? 0 : Spacing.width16, { duration: 300 }),
    };
  });

  const renderItem = ({ item }) => {
    return (
      <View />
    );
  };
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
          <SliderList title={t('home.typeFavorite')} data={favoriteMovies} />
          <HorizontalList title={t('movies.movieHot')} type="chapters" data={movies} titleViewMore={t('home.viewAll')} />
          <HorizontalList title={t('movies.tradingMovie')} type="chapters" data={movies} titleViewMore={t('home.viewAll')} />
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
