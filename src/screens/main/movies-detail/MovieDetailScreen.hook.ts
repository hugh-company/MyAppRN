import {navigate, SCREEN_ROUTE} from '@navigation';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {getDetailPostApi, viewsPostApi} from '@services';
import {useQuery} from '@tanstack/react-query';
import {useTheme} from '@theme';
import {
  chapterEpisodeInterface,
  detailPostInterface,
  PostTypeKey,
  SourceVideoInterface,
} from '@types';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import Orientation from 'react-native-orientation-locker';
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

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [showRating, setShowRating] = useState(false);
  //
  const [serverMovie, setServerMovie] = useState<
    SourceVideoInterface | undefined
  >(undefined);
  //
  const {data, isSuccess, refetch, error} = useQuery({
    queryKey: ['movieDetail', movieId],
    queryFn: () => getDetailPostApi(PostTypeKey.MOVIES, movieId),
  });
  const {} = useQuery({
    queryKey: ['viewMoves', movie.id],
    queryFn: () => viewsPostApi(movie?.id, PostTypeKey.MOVIES),
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log({data: data?.data});

      setDetailMovie(data?.data);
      setServerMovie(data?.data?.chapters?.[0]?.source?.[0]);
    }
    return () => {
      setDetailMovie(undefined);
      setIsFullScreenVisible(false);
    };
  }, [isSuccess, data]);

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

  const goToPlay = () => {
    const index = detailMovie?.index;
    if (index) {
      console.log(detailMovie?.chapters?.[index]);

      navigate(SCREEN_ROUTE.VIDEO, {
        video: {
          ...detailMovie?.chapters?.[index - 1],

          name: [
            detailMovie?.title,
            `(${
              detailMovie?.chapters?.[(detailMovie?.index || 1) - 1]?.title
            })`,
          ].join(' '),
        },
      });
    } else {
      navigate(SCREEN_ROUTE.VIDEO, {
        video: {
          ...detailMovie?.chapters?.[0],
          name: detailMovie?.title,
        },
      });
    }
    // navigate(SCREEN_ROUTE.VIDEO, {
    //   video: {
    //     ...detailMovie?.chapters?.[0],
    //     name: detailMovie?.title,
    //   },
    // });
  };

  const onSelectedChapter = (chapter: chapterEpisodeInterface) => {
    console.log({chapter});
    setServerMovie(chapter?.source?.[0]);
    setDetailMovie(prev => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        index: chapter.index,
        feature: chapter.feature,
      };
    });
  };
  const onNavigateDetail = (post: detailPostInterface) => {
    setMovieId(post.id);
    setDetailMovie(post);
    refetch();
  };
  const onSelectServer = (item: SourceVideoInterface) => {
    setServerMovie(item);
  };
  return {
    themeColors,
    styles,
    detailMovie,

    onRefresh: refetch,

    showRating,
    setShowRating,
    goToPlay,
    onSelectedChapter,
    error,
    isFullScreenVisible,
    setIsFullScreenVisible,
    refetch,
    onNavigateDetail,
    serverMovie,
    onSelectServer,
  };
};
