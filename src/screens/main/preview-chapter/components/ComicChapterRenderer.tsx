import { AppText } from '@components';
import { FlashList } from '@shopify/flash-list';
import { Spacing, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from '../styles';
import ImageChapter from './ImageChapter';

// Create animated FlashList component outside the main component
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

interface ComicChapterRendererProps {
  data: string[];
  chapter: any;
  scrollRef: React.RefObject<FlashList<any> | null>;
  scrollHandler: any;
  onClickScreen: () => void;
}

const ComicChapterRenderer = ({
  data,
  chapter,
  scrollRef,
  scrollHandler,
  onClickScreen,
}: ComicChapterRendererProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top, bottom } = useSafeAreaInsets();

  // Memoize header and footer components
  const HeaderComponent = useMemo(
    () => (
      <View
        style={[
          styles.headerTitle,
          { height: Spacing.height70 + top, paddingTop: top },
        ]}
      >
        <AppText style={styles.titleChapter}>{chapter?.title}</AppText>
      </View>
    ),
    [chapter?.title, styles, top]
  );

  const FooterComponent = useMemo(
    () => (
      <View
        style={[styles.bottom, { height: bottom + Spacing.height70 }]}
      />
    ),
    [bottom, styles]
  );

  const renderItem = ({ item }: { item: any }) => {
    return <ImageChapter uri={item} onPress={onClickScreen} />;
  };

  const getItemType = () => {
    return 'comic';
  };

  return (
    <AnimatedFlashList
      data={data || []}
      renderItem={renderItem}
      ref={scrollRef}
      estimatedItemSize={400}
      ListHeaderComponent={HeaderComponent}
      ListFooterComponent={FooterComponent}
      keyExtractor={(item: any, index: number) => `item-chapter-${index}`}
      onScroll={scrollHandler}
      scrollEventThrottle={32}
      maxToRenderPerBatch={4}
      windowSize={7}
      removeClippedSubviews={true}
      initialNumToRender={2}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      getItemType={getItemType}
      overrideItemLayout={(layout: any) => {
        layout.size = 400; // Estimate comic image height
      }}
    />
  );
};

export default React.memo(
  ComicChapterRenderer,
  (prevProps, nextProps) => {
    return (
      prevProps.data === nextProps.data &&
      prevProps.chapter?.id === nextProps.chapter?.id
    );
  }
);
