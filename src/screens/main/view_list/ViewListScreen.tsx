import { AppListMovies, LoadingList, ModalFilter } from '@components';
import { t } from 'i18next';
import React, { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useViewListScreen } from './ViewListScreen.hook';
import { FilterListModal } from './components/FilterListModal';
import { HeaderListScreen } from './components/HeaderListScreen';
const MemoizedModalFilter = memo(ModalFilter);
const ViewListScreen = () => {
  const { data, refFlatList, styles, label, slugCategory, onSelectedCategory,
    categoriesList, loading, list,
    onLoadMore, isFilter, setIsFilter, menuSort,
    filterBySort, sort,
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
        sort={menuSort?.find((item) => item.key === sort)}
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
      <FilterListModal
        visible={isFilter}
        value={sort}
        onClose={() => setIsFilter(false)}
        label={`${t('search.sort')}:`}
        onSelect={filterBySort}
        data={menuSort}
      />
    </View>
  );
};

export default ViewListScreen;
