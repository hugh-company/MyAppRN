import {useRoute} from '@react-navigation/native';
import {Spacing, useTheme} from '@theme';
import {ChapterEpisode, PostTypeKey} from '@types';
import {useCallback, useEffect, useState} from 'react';
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {createStyles} from './styles';
interface PreviewChapterProps {
  chapter: ChapterEpisode;
  type: PostTypeKey;
}
export const usePreviewChapter = () => {
  const router = useRoute();
  const {chapter, type} = router.params as PreviewChapterProps;
  const [data, setData] = useState<{url: string}[] | {text: string}[]>([]);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentY = event.contentOffset.y;
      if (currentY < 50) {
        scrollY.value = 0;
      } else if (currentY > prevScrollY.value) {
        scrollY.value = 1; // scrolling down
      } else if (currentY < prevScrollY.value) {
        scrollY.value = 0; // scrolling up
      }
      prevScrollY.value = currentY;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 1],
      [0, -Spacing.height150],
      'clamp',
    );
    return {
      transform: [
        {
          translateY:
            scrollY.value === 0 && prevScrollY.value < 100 ? 0 : translateY,
        },
      ],
    };
  });
  const fetchData = useCallback(() => {
    if (chapter) {
      if (type === PostTypeKey.COMIC) {
        const images: {url: string}[] = chapter.content?.map(item => {
          return {url: item.path};
        });
        console.log({images}, {chapter});

        setData(images);
      } else {
        const arrayText: {text: string}[] = chapter.content?.blocks?.map(
          item => {
            return {text: item?.data?.text};
          },
        );
        setData(arrayText);
      }
    }
  }, [chapter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, themeColors, styles, chapter, type, headerStyle, scrollHandler};
};
