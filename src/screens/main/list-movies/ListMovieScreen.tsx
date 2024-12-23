import { SearchIcon } from '@assets';
import { AppCategoryList, AppHeader, AppInputSearch, AppListMovies } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { categoryMovies, movies } from '@services';
import { Spacing } from '@theme';
import { TypeListMovie } from '@types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useListMovieScreen } from './ListMovieScreen.hook';

const ListMovieScreen = () => {
  const { data, themeColors, styles, name, search, onSearch, activeCategory, onSelectedCategory, scrollHandler, inputSearchStyle } = useListMovieScreen();

  return (
    <View style={styles.container}>
      <AppHeader title={name} rightComponent={<TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: TypeListMovie.MOVIES })} style={styles.btnSearch}>
        <SearchIcon size={Spacing.width24} />
      </TouchableOpacity>} />
      <Animated.View style={[styles.inputSearch, inputSearchStyle]}>
        <AppInputSearch
          value={search}

          onChangeText={(text) => {
            onSearch(text);
          }}
        />
      </Animated.View>
      <AppCategoryList data={categoryMovies} categoryId={activeCategory} onSelectedCategory={onSelectedCategory} style={styles.category} listStyle={styles.listCategory} />
      <Animated.View style={styles.listContainer}>
        <AppListMovies
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          data={movies}
        />
      </Animated.View>
    </View>
  );
};

export default ListMovieScreen;
