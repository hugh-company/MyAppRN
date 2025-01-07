import { LeftIcon } from '@assets';
import { AppFlatListAnimated, AppText } from '@components';
import { goBack } from '@navigation';
import { Spacing } from '@theme';
import { PostTypeKey } from '@types';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreviewChapter } from './PreviewChapter.hook';
import ImageChapter from './components/ImageChapter';

const PreviewChapter = () => {
  const { data, chapter, styles, type, headerStyle, scrollHandler } = usePreviewChapter();
  const { top } = useSafeAreaInsets();


  const renderItem = useCallback(({ item }) => {
    if (type === PostTypeKey.COMIC) {
      return <ImageChapter uri={item.url} />;
    } else {
      return <AppText>{item.text}</AppText>;
    }
  }, []);


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, type === PostTypeKey.COMIC && styles.positionHeader, { paddingTop: top || Spacing.width16 }, type === PostTypeKey.COMIC && { ...headerStyle }]}>
        <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnBack} onPress={() => { }}>
          <DotsIcon />
        </TouchableOpacity> */}
      </Animated.View>
      <AppFlatListAnimated
        data={data}
        renderItem={renderItem}
        style={[type === PostTypeKey.NOVEL && styles.containerList]}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews

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
