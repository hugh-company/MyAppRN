import { AppEpisodes, AppHeader, AppInfoContent, AppServerList, CustomVideoPlayer, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { BannerInfoMovie } from './components/BannerInfoMovie';
import { StatusInfoMovie } from './components/StatusInfoMovie';

export const MovieDetailScreen = () => {
  const { styles, isFullScreenVisible, setIsFullScreenVisible,
    detailMovie, onSelectedChapter, onNavigateDetail, serverMovie, setIsPlaying,
    isPlaying, listChapter,
    isLoading,
    onSelectServer,
    onSkipNext, isSuccess,
    onSkipPrevious } = useMovieDetailScreen();
  const { top } = useSafeAreaInsets();
  const opacity = useSharedValue(1);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    opacity.value = withTiming(isFullScreenVisible ? 0 : 1, { duration: 300 });
    return () => {
      opacity.value = withTiming(1, { duration: 300 });
    };
  }, [isFullScreenVisible, opacity]);

  useEffect(() => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [serverMovie]);


  return (
    <View style={[styles.container, !isFullScreenVisible && { paddingTop: top }]}>
      <FlatList
        ref={flatListRef}
        key={detailMovie?.id}
        showsVerticalScrollIndicator={false}
        // onScroll={scrollHandler}
        data={[detailMovie]}
        renderItem={({ item }: any) => (
          <>
            <View >
              {isPlaying ?
                <CustomVideoPlayer
                  uri={serverMovie?.link || ''}
                  setIsFullScreenVisible={setIsFullScreenVisible}
                  isFullScreenVisible={isFullScreenVisible}
                  typeMovie={item?.movie_type}
                  valueChapter={detailMovie?.index || 0}
                  episodes={listChapter || []}
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
                  loading={!!detailMovie}
                  onPlay={() => setIsPlaying(true)}
                />}

            </View>
            <StatusInfoMovie movie={item} isPlaying={isPlaying} />
            {serverMovie && !isLoading &&
              <AppServerList
                list={listChapter?.[(detailMovie?.index || 1) - 1]?.source || []}
                value={serverMovie?.link}
                onSelectServer={onSelectServer} />
            }
            {item?.movie_type === 'tvseries' && item?.chapter_total > 0 && listChapter?.length > 0 && (
              <AppEpisodes
                chapter_total={item?.chapter_total || 0}
                type={PostTypeKey.MOVIES}
                style={styles.episodes}
                value={detailMovie?.index || 1}
                title={t('movie.list_chapters')}
                loading={isLoading}
                onSelectChapter={onSelectedChapter}
                idPost={item?.id}
                onPlayVideo={() => setIsPlaying(true)}
                episodes={listChapter}
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
