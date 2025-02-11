import {navigate, SCREEN_ROUTE} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {getDetailPostApi, viewsPostApi} from '@services';
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
interface ChapterDetailInterface {
  chapter: detailPostInterface;
  type: PostTypeKey;
}
export const useChapterDetail = () => {
  const router = useRoute();
  const {chapter, type = PostTypeKey.COMIC} =
    router.params as ChapterDetailInterface;
  const [detail, setDetail] = useState<detailPostInterface>(chapter);
  const [loading, setLoading] = useState(true);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  // call api
  useEffect(() => {
    const controller = new AbortController();
    callAllApi();

    return () => {
      controller.abort();
      scrollY.value = 0; // Reset animation value
    };
  }, []);
  const callAllApi = async () => {
    Promise.all([callApi(), viewMovieApi()]).finally(() => {
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

  const onSelectChapter = (chapter: chapterEpisodeInterface) => {
    setDetail(prev => ({
      ...prev,
      index: chapter.index,

      feature: chapter.feature,
    }));
  };
  const readChapter = () => {
    const index = detail?.index;
    if (index) {
      navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
        chapter: detail?.chapters?.[index - 1],

        chapters: detail?.chapters,
        type,
      });
    } else {
      navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
        chapter: detail?.chapters?.[0],
        chapters: detail?.chapters,
        type,
      });
    }
  };
  //
  return {
    styles,
    detail,
    loading,
    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh,
    readChapter,
    themeColors,
    type,
    onSelectChapter,
  };
};
