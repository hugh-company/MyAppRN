import { DotsIcon, LeftIcon } from '@assets';
import { AppText } from '@components';
import { goBack } from '@navigation';
import { detailChapterWithText } from '@services';
import { Spacing } from '@theme';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreviewChapter } from './PreviewChapter.hook';
import ImageChapter from './components/ImageChapter';

const PreviewChapter = () => {
  const { data, chapter, styles } = usePreviewChapter();
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
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
    const translateY = interpolate(scrollY.value, [0, 1], [0, -Spacing.height150], 'clamp');
    return {
      transform: [{ translateY: scrollY.value === 0 && prevScrollY.value < 100 ? 0 : translateY }],
    };
  });

  const renderItem = useCallback(({ item }) => {
    return <ImageChapter uri={item.url} />;
  }, []);

  const renderBody = useCallback(() => {
    if (chapter.type === 'list') {
      return (
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          removeClippedSubviews
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      );
    } else {
      <Animated.ScrollView>
        <AppText style={{ color: 'white' }}>
          {detailChapterWithText.data}
        </AppText>
      </Animated.ScrollView>;
    }
  }
    , [data, renderItem, scrollHandler]);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { paddingTop: top || Spacing.width16 }, headerStyle]}>
        <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBack} onPress={() => { }}>
          <DotsIcon />
        </TouchableOpacity>
      </Animated.View>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}

        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
      {/* <Animated.ScrollView style={styles.containerListText} onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <AppText style={{ color: 'white' }}>
          {detailChapterWithText.data}
        </AppText>
      </Animated.ScrollView> */}
    </View>
  );
};

export default PreviewChapter;
