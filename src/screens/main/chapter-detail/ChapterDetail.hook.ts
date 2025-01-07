import {useRoute} from '@react-navigation/native';
import {getDetailListPostApi, getDetailPostApi, viewsPostApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {chapterDetailInterface, KeyTypeWithCategory, PostTypeKey} from '@types';
import {useEffect, useState} from 'react';
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';
interface ChapterDetailInterface {
  chapter: chapterDetailInterface;
  type: PostTypeKey;
}
export const useChapterDetail = () => {
  const router = useRoute();
  const {chapter, type = PostTypeKey.COMIC} =
    router.params as ChapterDetailInterface;
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(chapter);
  const [loading, setLoading] = useState(true);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  // call api
  useEffect(() => {
    callAllApi();
  }, []);
  const callAllApi = async () => {
    Promise.all([callApi(), listMovieApi(), viewMovieApi()]).finally(() => {
      setLoading(false);
    });
  };
  // views
  const viewMovieApi = async () => {
    try {
      await viewsPostApi(chapter?.id, type);
    } catch (error) {
      console.log({error});
    }
  };
  //
  const callApi = async () => {
    try {
      const response: any = await getDetailPostApi(type, chapter.id);
      console.log({response});

      setDetail(response?.data);
      setLoading(false);
    } catch (error) {
      console.log({error});
      setLoading(false);
    }
  };
  const listMovieApi = async () => {
    try {
      const response: any = await getDetailListPostApi(
        type,
        type === PostTypeKey.COMIC
          ? KeyTypeWithCategory.COMIC
          : KeyTypeWithCategory.NOVEL,
      );
      const newData = response?.data?.data || [];
      // remove item trung lap vs movie dang xem
      const filterData = newData.filter((item: any) => item.id !== chapter.id);
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
  //
  return {
    styles,
    detail,
    loading,
    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh,
    data,
    themeColors,
    type,
  };
};
