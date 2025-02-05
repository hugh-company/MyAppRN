import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useComicScreen } from './ComicScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard);

const ComicScreen = () => {
  const { data, styles, opacityStyle, tabSelect,
    heightStyle, handleCategorySelect,
    scrollHandler, onRefresh, loading, categories } = useComicScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('chapter.title')} type={PostTypeKey.COMIC} />
      <Animated.View style={[styles.inputSearch, heightStyle, opacityStyle]}>
        <AppInputSearch
          value={''}
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: PostTypeKey.COMIC })}
          editable={false}
        />
      </Animated.View>
      <AppCategoryList data={categories} categoryId={tabSelect?.id} onSelectedCategory={handleCategorySelect} />

      <MemoizedAppListDashboard
        data={data}
        // onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}
        categoryId={tabSelect?.id}
        onSelectedCategory={handleCategorySelect}
        typeScreen={ItemListDashboard.COMIC}
        keyExtractor={(item, index) => `comic_dashboard_${index}`}
        key={'comic_dashboard'}
      />
    </View>
  );
};

export default ComicScreen;
