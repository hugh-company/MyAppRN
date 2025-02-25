import { navigate, SCREEN_ROUTE } from '@navigation';
import { useRoute } from '@react-navigation/native';
import { getDetailPostApi, viewsPostApi } from '@services';
import { useQuery } from '@tanstack/react-query';
import { Spacing, useTheme } from '@theme';
import {
  chapterEpisodeInterface,
  detailPostInterface,
  PostTypeKey,
} from '@types';
import React, { useEffect, useState } from 'react';
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyles } from './styles';
interface ChapterDetailInterface {
  chapter: detailPostInterface;
  type: PostTypeKey;
}
export const useChapterDetail = () => {
  const router = useRoute();
  const {chapter, type = PostTypeKey.COMIC} =
    router.params as ChapterDetailInterface;
  const [detail, setDetail] = useState<detailPostInterface>(chapter);
  const [idPost, setIdPost] = useState(chapter.id);
  const refList = React.useRef<any>(null);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  // call api
  const {data, isSuccess, refetch, error, isFetching} = useQuery({
    queryKey: ['chapterDetail', idPost],
    queryFn: () => getDetailPostApi(type, idPost),
  });
  console.log({data},error);

  useQuery({
    queryKey: ['viewChapter', idPost],
    queryFn: () => viewsPostApi(chapter?.id, type),
  });
  useEffect(() => {
    if (isSuccess && data) {
      setDetail(data?.data);
    }
  }, [isSuccess, data]);
  const onRefresh = () => {
    refetch();
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
    navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
      chapter: {
        ...chapter,
        name: detail.title,
      },

      chapters: detail?.chapters,
      type,
    });
  };
  const readChapter = () => {
    const index = detail?.index;
    if (index) {
      navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
        chapter: {
          ...detail?.chapters?.[index - 1],
          name: detail.title,
        },

        chapters: detail?.chapters,
        type,
      });
    } else {
      navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
        chapter: {
          ...detail?.chapters?.[0],
          name: detail.title,
        },
        chapters: detail?.chapters,
        type,
      });
    }
  };
  //
  const onNavigateDetail = (post: detailPostInterface) => {
    setIdPost(post.id);
    setDetail(post);
    refetch();
    // scroll to top
    if (refList.current) {
      refList.current.scrollTo({y: 0});
    }
  };
  return {
    styles,
    onNavigateDetail,
    detail,
    loading: isFetching,
    scrollHandler,
    headerBackgroundColorStyle,
    onRefresh,
    readChapter,
    themeColors,
    type,
    onSelectChapter,
    refList,
  };
};
