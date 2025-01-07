import {useRoute} from '@react-navigation/native';
import {getDetailListPostApi, getDetailPostApi, viewsPostApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {KeyTypeWithCategory, movieDetailInterface, PostTypeKey} from '@types';
import {useEffect, useState} from 'react';
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';
interface MovieDetailScreenProps {
  movie: movieDetailInterface;
}
export const useMovieDetailScreen = () => {
  const router = useRoute();
  const {movie} = (router?.params as unknown as MovieDetailScreenProps) || {
    type: undefined,
  };

  const [detailMovie, setDetailMovie] = useState<
    movieDetailInterface | undefined
  >(movie);

  const [loading, setLoading] = useState(true);
  const [chapterSelect, setChapterSelect] = useState(1);
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  const [showRating, setShowRating] = useState(false);
  useEffect(() => {
    callAllApi();
    viewMovieApi();
  }, []);
  // views
  const viewMovieApi = async () => {
    try {
      await viewsPostApi(movie?.id, PostTypeKey.MOVIES);
    } catch (error) {
      console.log({error});
    }
  };
  //
  const callAllApi = async () => {
    Promise.all([callApi(), listMovieApi()]).finally(() => {
      setLoading(false);
    });
  };
  const callApi = async () => {
    try {
      const response: any = await getDetailPostApi(
        PostTypeKey.MOVIES,
        movie.id,
      );
      setDetailMovie(response?.data);
    } catch (error) {
      console.log({error});
    }
  };
  const listMovieApi = async () => {
    try {
      const response: any = await getDetailListPostApi(
        PostTypeKey.MOVIES,
        KeyTypeWithCategory.MOVIES,
      );
      const newData = response?.data?.data || [];
      // remove item trung lap vs movie dang xem
      const filterData = newData.filter((item: any) => item.id !== movie.id);
      setData(filterData || []);
    } catch (error) {
      console.log({error});
    }
  };
  const onRefresh = () => {
    callApi();
  };
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
  return {
    data,
    themeColors,
    styles,
    detailMovie,
    chapterSelect,
    setChapterSelect,
    loading,
    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh,
    showRating,
    setShowRating,
  };
};
