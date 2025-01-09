import { AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useComicScreen } from './ComicScreen.hook';

const ComicScreen = () => {
  const { data, styles, search, tabSelect,
    heightStyle, handleCategorySelect,
    scrollHandler, onRefresh, loading, handleSearchChange } = useComicScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('chapter.title')} type={PostTypeKey.COMIC} />
      <Animated.View style={[styles.inputSearch, heightStyle]}>
        <AppInputSearch
          value={''}
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: PostTypeKey.COMIC })}
          editable={false}
        />
      </Animated.View>
      <AppListDashboard
        data={data}
        onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}
        categoryId={tabSelect?.id}
        onSelectedCategory={handleCategorySelect}
        typeScreen={ItemListDashboard.COMIC}
        key={tabSelect?.id} // Add this line
      />
    </View>
  );
};

export default ComicScreen;
