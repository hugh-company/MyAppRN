import { AppListMovies, LoadingList } from '@components';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useViewListScreen } from './ViewListScreen.hook';
import { HeaderListScreen } from './components/HeaderListScreen';

const ViewListScreen = () => {
  const { data, type, styles, label, search, onSearch, slugCategory, onSelectedCategory, scrollHandler, scrollY,
    categoriesList, loading, list,
    onLoadMore,
  } = useViewListScreen();

  return (
    <View style={styles.container}>
      <HeaderListScreen
        title={label || ''}
        search={search}
        onSearch={onSearch}
        onSelectedCategory={onSelectedCategory}
        activeCategory={categoriesList?.find((item) => item?.slug === slugCategory)?.id}
        categories={categoriesList}
        type={data?.posttype}
        scrollY={scrollY} />
      {loading ? <LoadingList numColumns={2} /> : <Animated.View style={styles.listContainer}>
        <AppListMovies
          numColumns={2}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          data={list}
          type={data?.posttype}
          onLoadMore={onLoadMore}
          keyExtractor={(item, index) => `view_list_${item?.id || index}`}

        />
      </Animated.View>}
    </View>
  );
};

export default ViewListScreen;
