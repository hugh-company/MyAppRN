import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, View } from 'react-native';
import { useComicScreen } from './ComicScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard);

const ComicScreen = () => {
  const { data, styles, tabSelect,
    handleCategorySelect,
    scrollHandler, onRefresh, loading, categories } = useComicScreen();

  const [shouldRenderList, setShouldRenderList] = React.useState(false);

  React.useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRenderList(true);
    });

    return () => interactionHandle.cancel();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderMain title={t('chapter.title')} type={PostTypeKey.COMIC} />
      <AppInputSearch
        onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: PostTypeKey.COMIC })}
        editable={false}
        style={styles.inputSearch}
      />

      <AppCategoryList data={categories} categoryId={tabSelect?.id} onSelectedCategory={handleCategorySelect} />

      {shouldRenderList && (
        <MemoizedAppListDashboard
          data={data}
          onScroll={scrollHandler}
          loading={loading}
          onRefresh={onRefresh}
          categoryId={tabSelect?.id}
          onSelectedCategory={handleCategorySelect}
          typeScreen={ItemListDashboard.COMIC}
          keyExtractor={(item, index) => `comic_dashboard_${index}`}
          key={'comic_dashboard'}
        />
      )}
    </View>
  );
};

export default ComicScreen;
