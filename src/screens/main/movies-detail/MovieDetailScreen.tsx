import { HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { dataSearch } from '@services';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { HeaderDetail } from './components/HeaderDetail';
import { InfoMovie } from './components/InfoMovie';

const MovieDetailScreen = () => {
  const { data, themeColors, styles, detailMovie, chapterSelect, setChapterSelect } = useMovieDetailScreen();

  if (!detailMovie) {
    return null;
  }
  return (
    <View style={styles.container}>
      <HeaderDetail movie={detailMovie}  >
        <InfoMovie movie={detailMovie} chapter={chapterSelect} />

        <HorizontalList data={dataSearch?.map(elm => ({
          ...elm,
          image: elm?.poster,
        }))}
          type={TypeListMovie.MOVIES}
          title={t('movie.otherMovie')}
          itemStyle={styles.itemImage}
          onViewMore={() => {
            navigate(SCREEN_ROUTE.VIEW_LIST, { type: 'movie', name: t('movie.otherMovie') });
          }}
        />
      </HeaderDetail>
    </View >
  );
};

export default MovieDetailScreen;
