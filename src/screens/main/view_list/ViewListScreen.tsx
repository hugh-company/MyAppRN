import { AppListMovies, LoadingList } from '@components';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useViewListScreen } from './ViewListScreen.hook';
import { HeaderListScreen } from './components/HeaderListScreen';

const ViewListScreen = () => {
  const { data, type, styles, name, search, onSearch, activeCategory, onSelectedCategory, scrollHandler, scrollY,
    categoriesList, loading,
  } = useViewListScreen();

  return (
    <View style={styles.container}>
      <HeaderListScreen
        title={name}
        search={search}
        onSearch={onSearch}
        onSelectedCategory={onSelectedCategory}
        activeCategory={activeCategory}
        categories={categoriesList}
        type={type}
        scrollY={scrollY} />
      {loading ? <LoadingList numColumns={categoriesList.length > 0 ? 2 : 1} /> : <Animated.View style={styles.listContainer}>
        <AppListMovies
          numColumns={categoriesList.length > 0 ? 2 : 0}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          data={data}
          type={type}
        />
      </Animated.View>}
    </View>
  );
};

export default ViewListScreen;
