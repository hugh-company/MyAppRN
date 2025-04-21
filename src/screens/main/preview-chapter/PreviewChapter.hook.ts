import {GlobalService} from '@components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigate} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {useDetailEpisodeApi} from '@services';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '@theme';
import {detailPostInterface, PostTypeKey} from '@types';
import React, {useCallback, useRef, useState} from 'react';
import {Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createStyles} from './styles';

interface PreviewChapterProps {
  detailPost: detailPostInterface;
  indexChapter: number;
  type: PostTypeKey;
}
export const usePreviewChapter = () => {
  const router = useRoute();
  const {detailPost, type, indexChapter} = router.params as PreviewChapterProps;
  console.log({indexChapter, detailPost, type});

  const [data, setData] = useState<{url: string}[] | {text: string}[]>([]);
  const refModal = useRef<BottomSheetModal>(null);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const scrollRef = useRef<FlashList<any>>(null);

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

  const {data: responseDetailChapter} = useDetailEpisodeApi(
    type,
    detailPost.id,
    indexChapter,
  );
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(0)).current;

  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const currentY = event.nativeEvent.contentOffset.y;
        const distanceThreshold = 50; // Smaller threshold for more responsive UI

        // Check if scroll position has changed significantly or if we're at the boundaries
        if (
          Math.abs(currentY - prevScrollY.current) > distanceThreshold ||
          currentY <= 0 ||
          currentY >=
            event.nativeEvent.contentSize.height -
              event.nativeEvent.layoutMeasurement.height
        ) {
          if (currentY > prevScrollY.current && currentY > 0) {
            // Scrolling down - hide controls
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
          } else if (currentY < prevScrollY.current || currentY <= 0) {
            // Scrolling up or at the top - show controls
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

          // Also show controls if we're at the bottom of the content
          if (
            currentY >=
            event.nativeEvent.contentSize.height -
              event.nativeEvent.layoutMeasurement.height -
              5
          ) {
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

          // Save current scroll position
          prevScrollY.current = currentY;
        }
      },
    },
  );

  const chapter = responseDetailChapter?.data;
  console.log({chapter});

  // Prefetch comic images when available
  React.useEffect(() => {
    if (
      type === PostTypeKey.COMIC &&
      chapter?.content &&
      Array.isArray(chapter.content)
    ) {
      const prefetchImages = chapter.content.map(uri => ({uri}));

      const batchSize = 5; // số ảnh mỗi batch
      const delay = 100; // thời gian giữa các batch (ms)

      async function prefetchInBatches(images: {uri: string}[]) {
        for (let i = 0; i < images.length; i += batchSize) {
          const batch = images.slice(i, i + batchSize);
          FastImage.preload(batch);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      prefetchInBatches(prefetchImages);
    }
    if (type !== PostTypeKey.COMIC && chapter?.content) {
      let arrayText: {text: string}[] = [];
      if (!Array.isArray(chapter.content) && chapter.content?.blocks) {
        arrayText = chapter.content.blocks.map(item => {
          return {text: item?.data?.text};
        });
      }
      setData(arrayText);
    }
  }, [type, chapter]);

  const goToNextChapter = useCallback(() => {
    GlobalService.showLoading();
    // Reset scroll position tracking before navigating
    prevScrollY.current = 0;
    navigate('PreviewChapter', {
      detailPost: detailPost,
      indexChapter: indexChapter + 1,
      type,
    });
    scrollRef.current?.scrollToOffset({offset: 0, animated: false});
    GlobalService.hideLoading();
  }, [type, indexChapter, detailPost]);

  const goToPrevChapter = useCallback(() => {
    GlobalService.showLoading();
    // Reset scroll position tracking before navigating
    prevScrollY.current = 0;
    navigate('PreviewChapter', {
      detailPost: detailPost,
      indexChapter: indexChapter - 1,
      type,
    });
    scrollRef.current?.scrollToOffset({offset: 0, animated: false});
    GlobalService.hideLoading();
  }, [type, indexChapter, detailPost]);

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
  const onSelectChapter = useCallback((item: number) => {
    GlobalService.showLoading();
    navigate('PreviewChapter', {
      detailPost: detailPost,
      indexChapter: item,
      type,
    });
    scrollRef.current?.scrollToOffset({animated: true, offset: 0});
    GlobalService.hideLoading();
  }, []);

  return {
    // Use chapter (retrieved from responseDetailChapter?.data) directly for COMIC type
    data: type === PostTypeKey.COMIC ? chapter?.content : data,
    themeColors,
    styles,
    chapter,
    type,
    headerStyle: {transform: [{translateY: headerTranslateY}]},
    scrollHandler,
    bottomStyle: {transform: [{translateY: bottomTranslateY}]},

    goToNextChapter,
    goToPrevChapter,
    refModal,
    onApplyFilter,
    filterText,
    onClickScreen,
    showModalFilter,
    setShowModalFilter,
    onSelectChapter,
    detailPost,
    scrollRef,
    indexChapter,
  };
};
