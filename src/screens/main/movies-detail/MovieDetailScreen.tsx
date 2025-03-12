import { AppEpisodes, AppHeader, AppInfoContent, AppServerList, CustomVideoPlayer, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { BannerInfoMovie } from './components/BannerInfoMovie';
import { StatusInfoMovie } from './components/StatusInfoMovie';

export const MovieDetailScreen = () => {
  const { styles, isFullScreenVisible, setIsFullScreenVisible,
    detailMovie, onSelectedChapter, onNavigateDetail, serverMovie, setIsPlaying,
    isPlaying, scrollHandler,
    isLoading,
    onSelectServer,
    onSkipNext,
    onSkipPrevious } = useMovieDetailScreen();
  const { top } = useSafeAreaInsets();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(isFullScreenVisible ? 0 : 1, { duration: 300 });
    return () => {
      opacity.value = withTiming(1, { duration: 300 });
    };
  }, [isFullScreenVisible, opacity]);


  return (
    <View style={[styles.container, !isFullScreenVisible && { paddingTop: top }]}>
      <Animated.FlatList
        key={detailMovie?.id}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        data={[detailMovie]}
        renderItem={({ item }: any) => (
          <>
            <View >
              {isPlaying ? <CustomVideoPlayer
                uri={serverMovie?.link || ''}
                setIsFullScreenVisible={setIsFullScreenVisible}
                isFullScreenVisible={isFullScreenVisible}
                typeMovie={item?.movie_type}
                valueChapter={detailMovie?.index || 0}
                episodes={item?.chapters || []}
                onSkipNext={() => {
                  onSkipNext();
                }}
                onSkipPrevious={() => {
                  onSkipPrevious();
                }}
              /> : <BannerInfoMovie
                movie={item}
                disabledVideo={!serverMovie?.link}
                isPlaying={isPlaying}
                loading={isLoading}
                onPlay={() => setIsPlaying(true)}
              />}

            </View>
            <StatusInfoMovie movie={item} isPlaying={isPlaying} />
            {serverMovie && !isLoading &&
              <AppServerList
                list={detailMovie?.chapters?.[detailMovie?.index || 0].source || []}
                value={serverMovie?.link}
                onSelectServer={onSelectServer} />
            }
            {item?.movie_type === 'tvseries' && item?.chapters?.length > 0 && (
              <AppEpisodes
                episodes={item?.chapters}
                style={styles.episodes}
                value={detailMovie?.chapters?.[detailMovie?.index || 0]?.id}
                title={t('movie.list_chapters')}
                onSelectChapter={onSelectedChapter}

              />
            )}
            <AppInfoContent
              type={PostTypeKey.MOVIES}
              style={styles.infoRow}
              detail={item}
              onRefresh={() => {
                onNavigateDetail(item);
              }}
              isPlaying={isPlaying}
            />
            <HorizontalList
              onDetail={(post: any) => onNavigateDetail(post)}
              data={item?.related_post?.items}
              type={PostTypeKey.MOVIES}
              button={item?.related_post?.button}
              title={item?.related_post?.label}
              itemStyle={styles.itemImage}
            />
            <View style={styles.paddingBottom} />

          </>
        )}
      />
      {!isPlaying && <AppHeader
        style={[styles.header, {}]} />}
    </View>
  );
};
