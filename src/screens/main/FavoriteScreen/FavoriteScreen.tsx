import { AppHeader, AppListMovies, LoadingList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useFavoriteScreen } from './FavoriteScreen.hook';

const FavoriteScreen = () => {
  const { data, type, styles, onLoadMore, loading } = useFavoriteScreen();
  const renderTitle = () => {
    switch (type) {
      case PostTypeKey.MOVIES:
        return t('favorites.movieSaves');
      case PostTypeKey.COMIC:
        return t('favorites.chapterSaves');
      case PostTypeKey.NOVEL:
        return t('favorites.chapterSaves');
      default:
        return t('favorites.title');
    }
  };
  return (
    <View style={styles.container}>
      <AppHeader title={renderTitle()} />
      {loading ? <LoadingList numColumns={2} /> :
        <AppListMovies
          numColumns={2}
          scrollEventThrottle={16}
          data={data}
          type={type}
          onLoadMore={onLoadMore}
        />}

    </View>
  );
};

export default FavoriteScreen;
