import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useComicScreen } from './ComicScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard);

const ComicScreen = () => {
  const { comics, styles, tabSelect,
    handleCategorySelect,
    onRefresh, loading, categories } = useComicScreen();

  const [shouldRenderList, setShouldRenderList] = React.useState(false);

  React.useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRenderList(true);
    });

    return () => interactionHandle.cancel();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(209, 16, 48, 0.72)', 'rgba(1, 1, 1, 0.72)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <HeaderMain title={t('chapter.title')} type={PostTypeKey.COMIC} />
        <AppInputSearch
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: PostTypeKey.COMIC })}
          editable={false}
          style={styles.inputSearch}
          placeholder={t('search.chapters')}
        />

        <AppCategoryList data={categories} categoryId={tabSelect?.id} onSelectedCategory={handleCategorySelect} />
      </LinearGradient>
      {shouldRenderList && (
        <MemoizedAppListDashboard
          data={comics}

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
