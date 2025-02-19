import { AppEpisodes, AppInfoContent, AppServerList, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';
import { InfoMovie } from './components/InfoMovie';
import { VideoPlayer } from './components/VideoPlayer';


const MovieDetailScreen = () => {
  const { styles, error, isFullScreenVisible, setIsFullScreenVisible,
    detailMovie, onSelectedChapter, onNavigateDetail, serverMovie,
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
      <VideoPlayer
        urlVideo={serverMovie?.link}
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
            {serverMovie && <AppServerList list={detailMovie?.chapters?.[detailMovie?.index || 0].source || []} value={serverMovie?.link} onSelectServer={onSelectServer} />}
            {item?.movie_type === 'tvseries' && item?.chapters?.length > 0 && (
              <AppEpisodes
                episodes={item?.chapters}
                style={styles.episodes}

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
