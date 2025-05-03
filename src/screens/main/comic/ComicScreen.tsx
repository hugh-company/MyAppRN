import { AppCategoryList, AppListDashboard, HeaderMain } from '@components';
import { Spacing } from '@theme';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, View } from 'react-native';
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

      <HeaderMain title={t('chapter.title')} type={PostTypeKey.COMIC} />


      <AppCategoryList data={categories} categoryId={tabSelect?.id} onSelectedCategory={handleCategorySelect} listStyle={{ marginVertical: 0, marginBottom: Spacing.width16 }} />

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
