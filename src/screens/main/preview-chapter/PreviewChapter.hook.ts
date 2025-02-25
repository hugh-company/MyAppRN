import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { navigate } from '@navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Spacing, useTheme } from '@theme';
import { chapterEpisodeInterface, PostTypeKey } from '@types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyles } from './styles';
interface PreviewChapterProps {
  chapters: chapterEpisodeInterface[];
  chapter: chapterEpisodeInterface;
  type: PostTypeKey;
}
export const usePreviewChapter = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const {chapters, chapter, type} = router.params as PreviewChapterProps;
  console.log({chapters, chapter, type});

  const [data, setData] = useState<{url: string}[] | {text: string}[]>([]);
  const refModal = useRef<BottomSheetModal>(null);
  const [showModalFilter, setShowModalFilter] = useState(false);
   const scrollRef = useRef<FlatList>(null);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);
  const [filterText, setFilterText] = useState({
    styleText: '',
    size: [14],
    color: '#FFFFFF',
    background: '#000000',
  });

  useEffect(() => {
    if (scrollRef?.current && scrollRef.current.scrollToIndex && data.length > 0) {
      scrollRef.current.scrollToIndex({ animated: false, index: 0 });
    }
  }, [scrollRef, data]);

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
  const bottomStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 1],
      [0, Spacing.width100],
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
        const images: {url: string}[] = Array.isArray(chapter.content)
          ? chapter.content.map(item => {
              return {url: item};
            })
          : [];
        setData(images);
      } else {
        let arrayText: {text: string}[] = [];
        if (!Array.isArray(chapter.content) && chapter.content?.blocks) {
          arrayText = chapter.content.blocks.map(item => {
            return {text: item?.data?.text};
          });
        }
        setData(arrayText);
      }
    }
  }, [chapter]);

  const goToNextChapter = useCallback(() => {
    const currentIndex = chapters.findIndex(item => item.id === chapter.id);
    if (currentIndex < chapters.length - 1) {

      const nextChapter = chapters[currentIndex + 1];
      navigate('PreviewChapter', {
        chapter: {
          ...nextChapter,
          name: chapter.name,
        },
        chapters,
        type,
      });
      scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });

    }
  }, [chapters, chapter, navigation, type]);

  const goToPrevChapter = useCallback(() => {
    const currentIndex = chapters.findIndex(item => item.id === chapter.id);
    if (currentIndex > 0) {

      const prevChapter = chapters[currentIndex - 1];
      navigate('PreviewChapter', {
        chapter: {
          ...prevChapter,
          name: chapter.name,
        },
        chapters,
        type,
      });
      scrollRef.current?.scrollToOffset({ animated: true, offset: 0 });

    }
  }, [chapters, chapter, navigation, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onApplyFilter = useCallback(item => {

    setFilterText({
      styleText: item.styleText,
      size: item.size,
      color: item.color,
      background: item.background,
    });
  }, []);
  const onClickScreen = useCallback(() => {
    if (scrollY.value === 0) {
      scrollY.value = 1;
    } else {
      scrollY.value = 0;
    }
  }, []);
  const onSelectChapter = useCallback((item: chapterEpisodeInterface) => {
    navigate('PreviewChapter', {
      chapter: {
        ...item,
        name: chapter.name,
      },
      chapters,
      type,
    });
  }, []);

  return {
    data,
    themeColors,
    styles,
    chapter,
    type,
    headerStyle,
    scrollHandler,
    bottomStyle,
    chapters,
    goToNextChapter,
    goToPrevChapter,
    refModal,
    onApplyFilter,
    filterText,
    onClickScreen,
    showModalFilter,
    setShowModalFilter,
    onSelectChapter,

    scrollRef,
  };
};
