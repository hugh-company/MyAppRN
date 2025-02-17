import { AppEpisodes, AppInfoContent, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import React, { useEffect } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { InfoMovie } from './components/InfoMovie';
import { VideoPlayer } from './components/VideoPlayer';


const MovieDetailScreen = () => {
  const { styles, error, isFullScreenVisible, setIsFullScreenVisible, detailMovie, onSelectedChapter, onNavigateDetail } = useMovieDetailScreen();
  const { top } = useSafeAreaInsets();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(isFullScreenVisible ? 0 : 1, { duration: 300 });
    return () => {
      opacity.value = withTiming(1, { duration: 300 });
    };
  }, [isFullScreenVisible, opacity]);

  if (error) {
    return null;
  }
  return (
    <View style={[styles.container, !isFullScreenVisible && { paddingTop: top }]}>
      <StatusBar translucent backgroundColor="transparent" hidden={true} />
      <VideoPlayer
        urlVideos={detailMovie?.chapters?.[detailMovie?.index || 0]?.source}
        image={detailMovie?.feature?.path}
        setIsFullScreenVisible={setIsFullScreenVisible}
        isFullScreenVisible={isFullScreenVisible}
        autoPlay={!!detailMovie?.index} // Add autoPlay prop
      />
      <FlatList
        key={detailMovie?.id}
        showsVerticalScrollIndicator={false}
        data={[detailMovie]}
        renderItem={({ item }: any) => (
          <>
            <InfoMovie movie={item} />
            {item?.movie_type === 'tvseries' && (
              <AppEpisodes
                episodes={item?.chapters}
                style={styles.episodes}
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
            />
            <HorizontalList
              onDetail={(post) => onNavigateDetail(post)}
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
    </View>
  );
};

export default MovieDetailScreen;
