import { AppListMovies, LoadingList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { useViewListScreen } from './ViewListScreen.hook';
import { FilterListModal } from './components/FilterListModal';
import { HeaderListScreen } from './components/HeaderListScreen';

const ViewListScreen = () => {
  const { data, refFlatList, styles, type, slugCategory, onSelectedCategory,
    categoriesList, loading, list,
    onLoadMore, menuSort, refModal,
    filterBySort, sort, sortby,
  } = useViewListScreen();

  useEffect(() => {
    return () => {
      refModal.current?.close();
    };
  }, []);

  const renderTitle = () => {
    const title = categoriesList?.find((item) => item?.slug === (slugCategory || 0))?.name || '';
    switch (data?.posttype) {
      case PostTypeKey.MOVIES:
        return `${t('view_list.movie')} ${title}`;
      case PostTypeKey.COMIC:
        return `${t('view_list.chapter')} ${title}`;
      case PostTypeKey.GAMES:
        return `${t('view_list.game')} ${title}`;
      default:
        return `${title}`;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#B1062E', '#1E1111', '#1E1111', 'rgba(0,0,0,0)']}
        style={styles.gradientBackground}
        start={{ x: 0.5, y: -0.1061 }}
        end={{ x: 0.5, y: 0.9383 }}
      />
      <HeaderListScreen
        title={renderTitle()}
        onSelectedCategory={onSelectedCategory}
        onFilter={() => refModal.current?.present()}
        activeCategory={categoriesList?.find((item) => item?.slug === (slugCategory || 0))?.id}
        categories={categoriesList}
        type={data?.posttype}
        sort={menuSort?.find((item) => item.key === sort)}
      />
      {loading ? <LoadingList numColumns={2} /> : <Animated.View style={styles.listContainer}>
        <AppListMovies
          onClickDetail={() => {
            refModal.current?.close();
          }}
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
        refBottomSheet={refModal}
        value={sort}
        label={`${t('view_list.sort')}`}
        onSelect={filterBySort}
        data={menuSort}
        disableReset={sort === (sortby)}
      />
    </View>
  );
};

export default ViewListScreen;
