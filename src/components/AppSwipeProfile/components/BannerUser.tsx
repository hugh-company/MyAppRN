import { AppImage } from '@components';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme } from '@theme';
import React, { forwardRef, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
export interface BannerUserProps {
  label?: string;
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  data: any[];
  height?: number;
  scrollEnabled?: boolean;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
}

export const BannerUser = forwardRef<FlatList<any>, BannerUserProps>((props, ref) => {
  const { data, style, height = HeightScreen * 0.7, scrollEnabled = true, onScrollBeginDrag, onScrollEndDrag,
    currentIndex = 0, setCurrentIndex = () => { },

  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const internalFlatListRef = useRef<FlatList<any>>(null);
  const flatListRef = ref || internalFlatListRef;

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  const renderItemBanner = ({ item, index }: any) => (
    <View key={index} style={[styles.btn, { height }]}>
      <AppImage uri={item} isBase={false} style={[styles.image, { height }]} />
    </View>
  );
  if (data.length === 0) { return null; }
  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={data}
        // horizontal // Disable horizontal scrolling
        pagingEnabled
        // scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false} // Change to vertical scroll indicator
        renderItem={renderItemBanner}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => (
          { length: height || HeightScreen, offset: (height || HeightScreen) * index, index }
        )}
        onScrollBeginDrag={onScrollBeginDrag} // Handle scroll start
        onScrollEndDrag={onScrollEndDrag} // Handle scroll end
      />
      <View style={styles.dotsContainer}>
        <View style={styles.dotsView}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => scrollToIndex(index)} // Add onPress handler
            />
          ))}
        </View>
      </View>
    </View>
  );
});
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    btn: {
      width: '100%',
    },
    image: {
      width: '100%',

    },
    dotsContainer: {
      position: 'absolute',
      right: Spacing.width16,
      justifyContent: 'center',
      top: Spacing.width16,
      bottom: Spacing.width16,
    },
    dotsView: {
      backgroundColor: themeColors.btnSocial,
      paddingVertical: Spacing.width4,
      // paddingHorizontal: Spacing.width2,
      gap: Spacing.width8,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: 50,
      height: 50,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 4,
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
  });
