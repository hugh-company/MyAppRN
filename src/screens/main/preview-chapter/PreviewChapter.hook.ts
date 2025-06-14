import {GlobalService} from '@components';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigate} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {useDetailEpisodeApi} from '@services';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '@theme';
import {detailPostInterface, PostTypeKey} from '@types';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, InteractionManager, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createStyles} from './styles';

interface PreviewChapterProps {
  detailPost: detailPostInterface;
  indexChapter: number;
  type: PostTypeKey;
}

// Optimized batch size and delay based on device capabilities
const BATCH_SIZE = Platform.OS === 'ios' ? 5 : 3;
const PREFETCH_DELAY = Platform.OS === 'ios' ? 100 : 150;
const TRANSITION_CONFIGS = {
  timing: {
    duration: 250,
    useNativeDriver: true,
  },
  threshold: 50,
};

export const usePreviewChapter = () => {
  const router = useRoute();
  const {detailPost, type, indexChapter} = router.params as PreviewChapterProps;

  const [data, setData] = useState<{url: string}[] | {text: string}[]>([]);
  const refModal = useRef<BottomSheetModal>(null);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const scrollRef = useRef<FlashList<any>>(null);

  // Use a ref to track control visibility state
  const isControlsVisible = useRef(true);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  // Use memoized Animated value to prevent recreation
  const scrollY = useMemo(() => new Animated.Value(0), []);
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

  // Use memoized Animated values
  const headerTranslateY = useMemo(() => new Animated.Value(0), []);
  const bottomTranslateY = useMemo(() => new Animated.Value(0), []);

  // Optimized scroll handler with debounce logic
  const scrollHandler = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: useCallback(
        (event: any) => {
          const currentY = event.nativeEvent.contentOffset.y;
          const distanceThreshold = TRANSITION_CONFIGS.threshold;

          // Check if scroll position has changed significantly or if we're at the boundaries
          const isSignificantChange =
            Math.abs(currentY - prevScrollY.current) > distanceThreshold;
          const isAtTop = currentY <= 0;
          const isAtBottom =
            currentY >=
            event.nativeEvent.contentSize.height -
              event.nativeEvent.layoutMeasurement.height -
              5;

          if (isSignificantChange || isAtTop || isAtBottom) {
            // Batch animation calls
            const animations = [];

            if (currentY > prevScrollY.current && currentY > 0 && !isAtBottom) {
              // Scrolling down - hide controls
              animations.push(
                Animated.timing(headerTranslateY, {
                  toValue: -150,
                  ...TRANSITION_CONFIGS.timing,
                }),
                Animated.timing(bottomTranslateY, {
                  toValue: 100,
                  ...TRANSITION_CONFIGS.timing,
                }),
              );
              isControlsVisible.current = false;
            } else if (
              currentY < prevScrollY.current ||
              isAtTop ||
              isAtBottom
            ) {
              // Scrolling up or at boundaries - show controls
              animations.push(
                Animated.timing(headerTranslateY, {
                  toValue: 0,
                  ...TRANSITION_CONFIGS.timing,
                }),
                Animated.timing(bottomTranslateY, {
                  toValue: 0,
                  ...TRANSITION_CONFIGS.timing,
                }),
              );
              isControlsVisible.current = true;
            }

            // Run animations in parallel for better performance
            if (animations.length) {
              Animated.parallel(animations).start();
            }

            // Save current scroll position
            prevScrollY.current = currentY;
          }
        },
        [headerTranslateY, bottomTranslateY],
      ),
    },
  );

  const chapter = responseDetailChapter?.data;

  // Prefetch comic images when available using a more efficient approach
  React.useEffect(() => {
    let mounted = true;

    const prepareContent = async () => {
      // Process chapter content after any pending interactions are complete
      await InteractionManager.runAfterInteractions(() => {
        if (!mounted) return;

        if (
          type === PostTypeKey.COMIC &&
          chapter?.content &&
          Array.isArray(chapter.content)
        ) {
          // Prefetch comic images in batches
          const prefetchImages = chapter.content.map((uri: string) => ({uri}));

          async function prefetchInBatches(images: {uri: string}[]) {
            for (let i = 0; i < images.length && mounted; i += BATCH_SIZE) {
              const batch = images.slice(
                i,
                Math.min(i + BATCH_SIZE, images.length),
              );
              FastImage.preload(batch);
              await new Promise(resolve => setTimeout(resolve, PREFETCH_DELAY));
            }
          }

          prefetchInBatches(prefetchImages);
        } else if (type !== PostTypeKey.COMIC && chapter?.content) {
          // Process text content
          let arrayText: {text: string}[] = [];
          if (!Array.isArray(chapter.content) && chapter.content?.blocks) {
            arrayText = chapter.content.blocks.map((item: any) => {
              return {text: item?.data?.text};
            });
          }
          setData(arrayText);
        }
      });
    };

    prepareContent();

    return () => {
      mounted = false;
    };
  }, [type, chapter]);

  const goToNextChapter = useCallback(() => {
    GlobalService.showLoading();

    // Reset scroll position tracking before navigating
    prevScrollY.current = 0;

    // Schedule navigation after interactions
    InteractionManager.runAfterInteractions(() => {
      navigate('PreviewChapter', {
        detailPost: detailPost,
        indexChapter: indexChapter + 1,
        type,
      });
      scrollRef.current?.scrollToOffset({offset: 0, animated: false});
      GlobalService.hideLoading();
    });
  }, [type, indexChapter, detailPost]);

  const goToPrevChapter = useCallback(() => {
    GlobalService.showLoading();

    // Reset scroll position tracking before navigating
    prevScrollY.current = 0;

    // Schedule navigation after interactions
    InteractionManager.runAfterInteractions(() => {
      navigate('PreviewChapter', {
        detailPost: detailPost,
        indexChapter: indexChapter - 1,
        type,
      });
      scrollRef.current?.scrollToOffset({offset: 0, animated: false});
      GlobalService.hideLoading();
    });
  }, [type, indexChapter, detailPost]);

  const onApplyFilter = useCallback((item: any) => {
    setFilterText({
      styleText: item.styleText,
      size: item.size,
      color: item.color,
      background: item.background,
    });
  }, []);

  const onClickScreen = useCallback(() => {
    const animations = [];

    // Toggle visibility state
    isControlsVisible.current = !isControlsVisible.current;

    if (isControlsVisible.current) {
      // Show controls
      animations.push(
        Animated.timing(headerTranslateY, {
          toValue: 0,
          ...TRANSITION_CONFIGS.timing,
        }),
        Animated.timing(bottomTranslateY, {
          toValue: 0,
          ...TRANSITION_CONFIGS.timing,
        }),
      );
    } else {
      // Hide controls
      animations.push(
        Animated.timing(headerTranslateY, {
          toValue: -150,
          ...TRANSITION_CONFIGS.timing,
        }),
        Animated.timing(bottomTranslateY, {
          toValue: 100,
          ...TRANSITION_CONFIGS.timing,
        }),
      );
    }

    Animated.parallel(animations).start();
  }, [headerTranslateY, bottomTranslateY]);

  const onSelectChapter = useCallback(
    (item: number) => {
      GlobalService.showLoading();

      // Schedule navigation after interactions
      InteractionManager.runAfterInteractions(() => {
        navigate('PreviewChapter', {
          detailPost: detailPost,
          indexChapter: item,
          type,
        });
        scrollRef.current?.scrollToOffset({animated: false, offset: 0});
        GlobalService.hideLoading();
      });
    },
    [detailPost, type],
  );

  // Memoize returned values to prevent unnecessary re-renders
  return {
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
