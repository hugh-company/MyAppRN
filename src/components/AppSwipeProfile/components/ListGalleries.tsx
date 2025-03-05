import { AppImage } from '@components';
import { ColorsApp, HeightScreen, Spacing, WidthScreen } from '@theme';
import { debounce } from 'lodash';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export interface ListGalleriesProps {
  data: string[];
}

const ListGalleries = (props: ListGalleriesProps) => {
  const { data } = props;
  const flatListRefBanner = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heightBanner = Platform.OS === 'android' ? HeightScreen * 0.8 : HeightScreen * 0.7;

  // Khi dữ liệu thay đổi, reset currentIndex và scroll về offset 0
  React.useEffect(() => {
    setCurrentIndex(0);
    flatListRefBanner.current?.scrollToOffset({ offset: 0, animated: false });
  }, [data]);
  // Sử dụng debounce với delay ngắn hơn để cập nhật index nhanh
  const onViewRef = useRef(
    debounce(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    }, 100)
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handlePress = useCallback((index: number, position: 'left' | 'right') => {
    if (position === 'left' && index > 0) {
      flatListRefBanner.current?.scrollToOffset({
        offset: (index - 1) * WidthScreen,
        animated: true,
      });
    } else if (position === 'right' && index < data.length - 1) {
      flatListRefBanner.current?.scrollToOffset({
        offset: (index + 1) * WidthScreen,
        animated: true,
      });
    }
  }, [data]);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={(e) => {
          const { locationX } = e.nativeEvent;
          const position = locationX < WidthScreen / 2 ? 'left' : 'right';
          handlePress(index, position);
        }}
      >
        <AppImage style={[styles.image, { height: heightBanner }]} uri={item} />
      </TouchableOpacity>
    ),
    [heightBanner, handlePress]
  );

  const keyExtractor = useCallback((item: string, index: number) => index.toString(), []);

  return (
    <View style={[styles.container, { height: heightBanner }]}>
      <FlatList
        ref={flatListRefBanner}
        data={data}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={{ flexGrow: 1 }}
        getItemLayout={(_, index) => ({
          length: WidthScreen,
          offset: WidthScreen * index,
          index,
        })}
        removeClippedSubviews={true}
        initialNumToRender={1}
      />
      {data?.length > 1 && <View style={styles.indicator}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { width: WidthScreen / data.length - Spacing.width24 },
              currentIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>}
    </View>
  );
};

export default memo(ListGalleries);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderRadius: Spacing.width16,
    overflow: 'hidden',
  },
  image: {
    width: WidthScreen,
  },
  indicator: {
    position: 'absolute',
    flexDirection: 'row',
    top: Spacing.width8,
    alignSelf: 'center',
    gap: Spacing.width8,
  },
  dot: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: ColorsApp.primary,
  },
});
