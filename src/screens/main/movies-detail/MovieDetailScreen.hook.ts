import {navigate, SCREEN_ROUTE} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {getDetailPostApi, viewsPostApi} from '@services';
import {useQuery} from '@tanstack/react-query';
import {Spacing, useTheme} from '@theme';
import {
  chapterEpisodeInterface,
  detailPostInterface,
  PostTypeKey,
} from '@types';
import {useEffect, useState} from 'react';
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

  const [detailMovie, setDetailMovie] = useState<
    detailPostInterface | undefined
  >(movie);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  const [showRating, setShowRating] = useState(false);
  //
  const {data, isSuccess, refetch, error, isFetching} = useQuery({
    queryKey: ['movieDetail', movie.id],
    queryFn: () => getDetailPostApi(PostTypeKey.MOVIES, movie.id),
  });
  const {} = useQuery({
    queryKey: ['viewMoves', movie.id],
    queryFn: () => viewsPostApi(movie?.id, PostTypeKey.MOVIES),
  });
  useEffect(() => {
    if (isSuccess && data) {
      setDetailMovie(data?.data);
    }
  }, [isSuccess, data]);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerBackgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, Spacing.height315],
        ['transparent', '#B1062E'],
      ),
    };
  });
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
        // title: [prev.title, `(${chapter.title})`].join(' '),
        feature: chapter.feature,
      };
    });
  };
  return {
    themeColors,
    styles,
    detailMovie,

    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh: refetch,
    isFetching,
    showRating,
    setShowRating,
    goToPlay,
    onSelectedChapter,
    error,
  };
};
