import { AppCategoryList, AppInputSearch, AppListDashboard, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMovieScreen } from './MovieScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data && prevProps.loading === nextProps.loading;
});

const MovieScreen = () => {
  const { movies,
    styles,

    handleCategorySelect,
    tabSelect,
    onRefresh,
    categories, loading,
  } = useMovieScreen();

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
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <HeaderMain title={t('movies.movieGood')} type={PostTypeKey.MOVIES} />

        <AppInputSearch
          onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: ItemListDashboard.MOVIES })}
          editable={false}
          style={styles.inputSearch}
        />

        <AppCategoryList
          contentContainerStyle={styles.category}
          data={categories}
          categoryId={tabSelect?.id}
          onSelectedCategory={handleCategorySelect} />
      </LinearGradient>

      {shouldRenderList && (
        <AppListDashboard
          data={movies}
          key={'movie_dashboard'}
          loading={loading}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => `movie_dashboard_${index}`}
          typeScreen={ItemListDashboard.MOVIES}
        />
      )}
    </View>
  );
};

export default MovieScreen;
