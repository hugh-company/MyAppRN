import { AppHeader, AppListMovies } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useSavedPost } from './SavedPost.hook';

const SavedPost = () => {
  const { data, themeColors, styles, type, title } = useSavedPost();
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
      <AppHeader title={title} />
      <AppListMovies
        numColumns={2}
        scrollEventThrottle={16}
        data={data}
        type={type}
      />

    </View>
  );
};

export default SavedPost;
