import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigate} from '@navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {chapterEpisodeInterface, PostTypeKey} from '@types';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {createStyles} from './styles';
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
  const scrollY = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);
  const [filterText, setFilterText] = useState({
    styleText: '',
    size: [14],
    color: '#FFFFFF',
    background: '#000000',
  });

  // useEffect(() => {
  //   if (
  //     scrollRef?.current &&
  //     scrollRef.current.scrollToIndex &&
  //     data.length > 0
  //   ) {
  //     scrollRef.current.scrollToIndex({animated: false, index: 0});
  //   }
  // }, [scrollRef, data]);

  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(0)).current;

  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const currentY = event.nativeEvent.contentOffset.y;
        const distance = Math.abs(currentY - prevScrollY.current);
        if (
          distance > 300 ||
          currentY <= 0 ||
          currentY >=
            event.nativeEvent.contentSize.height -
              event.nativeEvent.layoutMeasurement.height
        ) {
          if (currentY > prevScrollY.current && currentY > 0) {
            // Scrolling down
            Animated.timing(headerTranslateY, {
              toValue: -150,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(bottomTranslateY, {
              toValue: 100,
              duration: 300,
              useNativeDriver: true,
            }).start();
          } else if (
            currentY < prevScrollY.current &&
            currentY <
              event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height
          ) {
            // Scrolling up and not at the bottom
            Animated.timing(headerTranslateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(bottomTranslateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }
          prevScrollY.current = currentY;
        }
      },
    },
  );

  const fetchData = useCallback(() => {
    if (chapter) {
      if (type !== PostTypeKey.COMIC) {
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
      scrollRef.current?.scrollToOffset({animated: true, offset: 0});
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
      scrollRef.current?.scrollToOffset({animated: true, offset: 0});
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
    Animated.timing(scrollY, {
      toValue: scrollY._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [scrollY]);
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
    data: type === PostTypeKey.COMIC ? chapter.content : data,
    themeColors,
    styles,
    chapter,
    type,
    headerStyle: {transform: [{translateY: headerTranslateY}]},
    scrollHandler,
    bottomStyle: {transform: [{translateY: bottomTranslateY}]},
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
