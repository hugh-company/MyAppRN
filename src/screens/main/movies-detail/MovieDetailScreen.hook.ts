import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useDetailPostApi, useListEpisodeApi, viewsPostApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {
  chapterEpisodeInterface,
  detailPostInterface,
  PostTypeKey,
  SourceVideoInterface,
} from '@types';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';
interface MovieDetailScreenProps {
  movie: detailPostInterface;
}
export const useMovieDetailScreen = () => {
  const router = useRoute();
  const {movie} = (router?.params as unknown as MovieDetailScreenProps) || {
    type: undefined,
  };
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);

  const [detailMovie, setDetailMovie] = useState<
    detailPostInterface | undefined
  >(movie);
  const [movieId, setMovieId] = useState(movie.id);
  const [isPlaying, setIsPlaying] = React.useState(false); // Use autoPlay prop
  const scrollY = useSharedValue(0);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [showRating, setShowRating] = useState(false);

  const {data: dataEpisodes} = useListEpisodeApi(PostTypeKey.MOVIES, movie?.id);
  //
  const [serverMovie, setServerMovie] = useState<
    SourceVideoInterface | undefined
  >(undefined);
  //
  const {data, isSuccess, refetch, error, isLoading, isFetching} =
    useDetailPostApi(movieId, PostTypeKey.MOVIES);

  // const {} = useQuery({
  //   queryKey: ['viewMoves', movie.id],
  //   queryFn: () => viewsPostApi(movie?.id, PostTypeKey.MOVIES),
  // });
  useEffect(() => {
    if (movie?.id) {
      viewsPostApi(movie?.id, PostTypeKey.MOVIES);
    }
  }, [movie?.id]);
  useEffect(() => {
    if (isSuccess && data) {
      setDetailMovie({
        ...data?.data,
        index: 1,
      });
    }
    return () => {
      setDetailMovie(undefined);
      setIsFullScreenVisible(false);
    };
  }, [isSuccess, data]);

  //
  useEffect(() => {
    if (detailMovie) {
      setServerMovie(
        data?.data?.chapters?.[(detailMovie?.index || 1) - 1]?.source?.[0],
      );
    }
  }, [detailMovie, data?.data?.chapters]);
  //
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isFullScreenVisible) {
          Orientation.lockToPortrait();
          setIsFullScreenVisible(false);
          return true; // Prevent default behavior (going back)
        }
        return false; // Allow default behavior (going back)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // BackHandler.exitApp('hardwareBackPress', onBackPress);
      };
    }, [isFullScreenVisible]),
  );

  const onSelectedChapter = (chapter: chapterEpisodeInterface) => {
    setDetailMovie(prev => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        index: chapter.index || 1,
      };
    });
  };

  const onNavigateDetail = (post: detailPostInterface) => {
    setMovieId(post.id);
    setDetailMovie(post);
    setIsPlaying(false);
    refetch();
  };
  const onSelectServer = (item: SourceVideoInterface) => {
    setServerMovie(item);
  };
  console.log({detailMovie});
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, Spacing.height315],
      ['transparent', '#B1062E'],
    ),
  }));

  const onSkipNext = () => {
    const index = detailMovie?.index || 0;
    // next chapter video
    if (index < detailMovie?.chapters?.length - 1) {
      setDetailMovie(prev => {
        return {
          ...prev,
          index: index + 1,
        };
      });
    }
  };
  const onSkipPrevious = () => {
    const index = detailMovie?.index || 0;
    // next chapter video
    if (index > 0) {
      setDetailMovie(prev => {
        return {
          ...prev,
          index: index - 1,
        };
      });
    }
  };
  return {
    themeColors,
    styles,
    detailMovie,
    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh: refetch,

    showRating,
    setShowRating,

    onSelectedChapter,
    error,
    isFullScreenVisible,
    setIsFullScreenVisible,
    refetch,
    onNavigateDetail,
    serverMovie,
    onSelectServer,
    setIsPlaying,
    isPlaying,
    isLoading,
    onSkipNext,
    onSkipPrevious,
    listChapter: dataEpisodes?.data?.data || [],
  };
};
