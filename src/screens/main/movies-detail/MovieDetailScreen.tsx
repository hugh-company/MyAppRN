import { AppEpisodes, AppHeader, AppInfoContent, AppServerList, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { InfoMovie } from './components/InfoMovie';
import { VideoPlayer } from './components/VideoPlayer';

export const MovieDetailScreen = () => {
  const { styles, isFullScreenVisible, setIsFullScreenVisible,
    detailMovie, onSelectedChapter, onNavigateDetail, serverMovie, setIsPlaying,
    isPlaying, scrollHandler,
    headerBackgroundColorStyle,
    onSelectServer } = useMovieDetailScreen();
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
              <VideoPlayer
                urlVideo={serverMovie?.link}
                image={detailMovie?.feature
                  ?.path}
                setIsFullScreenVisible={setIsFullScreenVisible}
                isFullScreenVisible={isFullScreenVisible}
                autoPlay={!!detailMovie?.index} // Add autoPlay prop
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <View style={[!isPlaying && styles.infoMovie]}>
                <InfoMovie movie={item} isPlaying={isPlaying} />
              </View>
            </View>
            {serverMovie &&
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
        style={[styles.header, headerBackgroundColorStyle]} />}
    </View>
  );
};
