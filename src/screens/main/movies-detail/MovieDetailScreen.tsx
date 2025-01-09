import { DotsIcon } from '@assets';
import { AppEpisodes, AppHeader, AppInfoContent, HorizontalList, LoadingDetailMovie } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { PosterDetail } from './components/PosterDetail';


const MovieDetailScreen = () => {

  const { styles, detailMovie, loading, scrollHandler, headerBackgroundColorStyle, onRefresh, themeColors } = useMovieDetailScreen();

  if (loading) {
    return <LoadingDetailMovie />;
  }
  if (!detailMovie) {
    return null;
  }

  const posterMovie = detailMovie?.feature?.path;
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // refetch data
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} tintColor={themeColors.text} />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <PosterDetail
          name={detailMovie?.title}
          rating={detailMovie?.rating_count}
          typeData={'series'}
          type={PostTypeKey.MOVIES}

          duration={detailMovie?.duration}
          views={detailMovie?.views}
          likes={detailMovie?.like_count}
          poster={posterMovie}
          totalEpisodes={detailMovie?.chapter_total
          }
          onPlay={() => {
            console.log({ detailMovie: detailMovie?.chapters?.[0] });

            navigate(SCREEN_ROUTE.VIDEO, { video: detailMovie?.chapters?.[0] });
            // if (data?.chapters?.length) {
            //   navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: data?.chapters?.[data?.chapters?.length - 1] });
            // }
          }}
          onNewChapter={() => {
            // if (data?.chapters?.length) {
            //   navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: data?.chapters?.[0] });
            // }
          }}
        />
        {detailMovie?.movie_type === 'tvseries' && <AppEpisodes
          episodes={detailMovie?.chapters} style={styles.episodes}
          onSelectChapter={(item) => {
            console.log({ item });
            navigate(SCREEN_ROUTE.VIDEO, { video: item });

          }} />
        }
        <AppInfoContent
          type={PostTypeKey.MOVIES}
          name={detailMovie?.seo_title}
          id={detailMovie?.id}
          style={styles.infoRow}
          isSave={false}
          releaseDate={detailMovie?.release_date}
          tags={detailMovie?.categories}
          main_actors={detailMovie?.actors}
          description={detailMovie?.description}
          director={detailMovie?.directors}
        />
        <HorizontalList
          data={detailMovie.related_post}
          type={PostTypeKey.MOVIES}
          title={t('view_list.otherMovie')}
          itemStyle={styles.itemImage}

        />
        <View style={styles.paddingBottom} />
      </Animated.ScrollView>
      <AppHeader
        style={[styles.header, headerBackgroundColorStyle]}
        rightComponent={<TouchableOpacity
          // onPress={() => setShowRating(true)}
          style={styles.btnDots}><DotsIcon /></TouchableOpacity>} />

    </View >
  );
};

export default MovieDetailScreen;
