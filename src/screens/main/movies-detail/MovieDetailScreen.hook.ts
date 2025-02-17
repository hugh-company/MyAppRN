import {navigate, SCREEN_ROUTE} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {getDetailPostApi, viewsPostApi} from '@services';
import {useQuery} from '@tanstack/react-query';
import {useTheme} from '@theme';
import {
  chapterEpisodeInterface,
  detailPostInterface,
  PostTypeKey,
} from '@types';
import {useEffect, useState} from 'react';
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
      setDetailMovie(data?.data);
    }
    return () => {
      setDetailMovie(undefined);
      setIsFullScreenVisible(false);
    };
  }, [isSuccess, data]);

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
  };
};
