import {navigate, SCREEN_ROUTE} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {addHistoryItem} from '@redux';
import {useDetailPostApi, viewsPostApi} from '@services';
import {Spacing, useTheme} from '@theme';
import {detailPostInterface, PostTypeKey} from '@types';
import React, {useEffect, useState} from 'react';
import {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

interface ChapterDetailInterface {
  chapter: detailPostInterface;
  type: PostTypeKey;
}
export const useChapterDetail = () => {
  const router = useRoute();
  const dispatch = useDispatch();
  const {chapter, type = PostTypeKey.COMIC} =
    router.params as ChapterDetailInterface;
  const [detail, setDetail] = useState<detailPostInterface>(chapter);
  const [idPost, setIdPost] = useState(chapter.id);
  const refList = React.useRef<any>(null);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  // call api
  const {data, isSuccess, refetch, isFetching, isRefetching, error} =
    useDetailPostApi(idPost, type);
  console.log({data}, error);

  // useQuery({
  //   queryKey: ['viewChapter', idPost],
  //   queryFn: () => viewsPostApi(chapter?.id, type),
  // });
  useEffect(() => {
    if (detail?.id) {
      viewsPostApi(detail?.id, type);
    }
  }, [detail?.id]);
  useEffect(() => {
    if (isSuccess && data) {
      setDetail(data?.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log('Entered ChapterDetailScreen');
  }, []);

  useEffect(() => {
    if (chapter) {
      dispatch(
        addHistoryItem({...chapter, posttype: type, timestamp: Date.now()}),
      );
    }
  }, [chapter]);

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

  const readChapter = (index: number) => {
    navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
      indexChapter: index,
      detailPost: detail,
      type,
    });
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

    refList,
    isRefetching,
  };
};
