import { AppText } from '@components';
import { FlashList } from '@shopify/flash-list';
import { Spacing, normalize, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from '../styles';

// Create animated FlashList component outside the main component
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

interface NovelChapterRendererProps {
  data: { text: string }[];
  chapter: any;
  scrollRef: React.RefObject<FlashList<any> | null>;
  scrollHandler: any;
  filterText: {
    styleText: string;
    size: number[];
    color: string;
    background: string;
  };
}

// Memoized text item component to prevent unnecessary re-renders
const TextItem = React.memo(({ text, style }: { text: string; style: any }) => {
  return <AppText style={style}>{text}</AppText>;
});

const NovelChapterRenderer = ({
  data,
  chapter,
  scrollRef,
  scrollHandler,
  filterText,
}: NovelChapterRendererProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top, bottom } = useSafeAreaInsets();

  // Memoize text style to prevent recalculation on each render
  const textStyle = useMemo(() => ([
    styles.txtChapter,
    {
      fontSize: normalize(filterText.size[0]),
      color: filterText.color,
      backgroundColor: filterText.background,
      fontFamily: filterText.styleText || 'Roboto',
    }
  ]), [filterText, styles]);

  // Memoize header and footer components
  const HeaderComponent = useMemo(() => (
    <View style={[styles.headerTitle, { height: Spacing.height70 + top, paddingTop: top }]}>
      <AppText style={styles.titleChapter}>{chapter?.title}</AppText>
    </View>
  ), [chapter?.title, styles, top]);

  const FooterComponent = useMemo(() => (
    <View style={[styles.bottom, { height: bottom + Spacing.height70 }]} />
  ), [bottom, styles]);

  const renderItem = ({ item }: { item: { text: string } }) => {
    return <TextItem text={item.text} style={textStyle} />;
  };

  const getItemType = () => {
    return 'text';
  };

  return (
    <AnimatedFlashList
      data={data || []}
      renderItem={renderItem}
      ref={scrollRef}
      estimatedItemSize={50}
      ListHeaderComponent={HeaderComponent}
      ListFooterComponent={FooterComponent}
      contentContainerStyle={styles.containerList}
      keyExtractor={(item: any, index: number) => `item-chapter-${index}-${item?.text?.substring(0, 10)}`}
      onScroll={scrollHandler}
      scrollEventThrottle={32}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      getItemType={getItemType}
      overrideItemLayout={(layout: any) => {
        layout.size = 50; // Estimate text height
      }}
    />
  );
};

export default React.memo(NovelChapterRenderer, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.chapter?.id === nextProps.chapter?.id &&
    prevProps.filterText === nextProps.filterText
  );
});
