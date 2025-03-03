import { AppFilterControl, AppListMovies, LoadingList } from '@components';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useViewListScreen } from './ViewListScreen.hook';
import { HeaderListScreen } from './components/HeaderListScreen';

const ViewListScreen = () => {
  const { data, refFlatList, styles, label, search, onSearch, slugCategory, onSelectedCategory, scrollY,
    categoriesList, loading, list,
    onLoadMore, isFilter, setIsFilter,
  } = useViewListScreen();

  return (
    <View style={styles.container}>
      <HeaderListScreen
        title={label || ''}
        onSelectedCategory={onSelectedCategory}
        onFilter={() => setIsFilter(true)}
        activeCategory={categoriesList?.find((item) => item?.slug === slugCategory)?.id}
        categories={categoriesList}
        type={data?.posttype}
      />
      {loading ? <LoadingList numColumns={2} /> : <Animated.View style={styles.listContainer}>
        <AppListMovies
          ref={refFlatList}
          numColumns={2}

          scrollEventThrottle={16}
          data={list}
          type={data?.posttype}
          onLoadMore={onLoadMore}
          keyExtractor={(item, index) => `view_list_${item?.id || index}`}

        />
      </Animated.View>}
      <AppFilterControl
        visible={isFilter}
        onClose={() => setIsFilter(false)}

      />
    </View>
  );
};

export default ViewListScreen;
