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

  const [chapterSelect, setChapterSelect] = useState(0);
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
    if (detailMovie?.chapters?.[0]) {
      console.log({chapterSelect});
    }
  };

  const onSelectedChapter = (chapter: chapterEpisodeInterface) => {
    console.log({chapter});
  };
  return {
    themeColors,
    styles,
    detailMovie,
    chapterSelect,
    setChapterSelect,

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
