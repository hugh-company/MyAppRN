import { AppImage, AppText } from '@components';
import { ListRenderItem } from '@shopify/flash-list';
import { useTheme, WidthScreen } from '@theme';
import React, { useRef, useState } from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './styles';
export interface AppBannersProps {
  label?: string;
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  data: any[];
  renderItem?: ListRenderItem<any> | null | undefined;
  width?: number;
}
const AppBanners = ({ label, data = [], renderItem, width, labelStyle, style }: AppBannersProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItemBanner = ({ item, index }: any) => (
    <View key={index} style={styles.btn}>
      <AppImage uri={item.image} style={styles.image} />
      <LinearGradient
        colors={['#1400AE', 'rgba(115, 115, 115, 0)']}
        style={styles.overlay}
      />
      <LinearGradient
        colors={['#B1062E', 'rgba(0, 0, 0, 0)']}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.linear}
      />


    </View>
  );
  if (data.length === 0) { return null; }
  return (
    <View style={[styles.container, style]}>
      {label && <AppText style={[styles.title, labelStyle]}>{label}</AppText>}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        key={'banner'}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem || renderItemBanner}
        keyExtractor={(item, index) => `banner_child_${index}`}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        estimatedItemSize={width || WidthScreen}
      // getItemLayout={(data, index) => (
      //   { length: width || WidthScreen, offset: (width || WidthScreen) * index, index }
      // )}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default AppBanners;
