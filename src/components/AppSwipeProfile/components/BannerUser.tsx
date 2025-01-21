import { AppImage } from '@components';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { forwardRef, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
export interface BannerUserProps {
  label?: string;
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  data: any[];
  width?: number;
  scrollEnabled?: boolean;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
}

const BannerUser = forwardRef<FlatList<any>, BannerUserProps>((props, ref) => {
  const { data, style, width = WidthScreen, scrollEnabled = true, onScrollBeginDrag, onScrollEndDrag,


  } = props;
  const height = HeightScreen * 0.7;
  const { themeColors } = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
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
    <View key={index} style={[styles.btn, { height, width }]}>
      <AppImage uri={item} style={[styles.image, { height, width }]} />
    </View>
  );
  if (data.length === 0) { return null; }
  return (
    <View style={[styles.container, style, { width: width }]}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal // Disable horizontal scrolling
        pagingEnabled
        // scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false} // Change to vertical scroll indicator
        renderItem={renderItemBanner}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => (
          { length: width || WidthScreen, offset: (width || WidthScreen) * index, index }
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
      justifyContent: 'center',

      bottom: Spacing.width80,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    dotsView: {
      backgroundColor: themeColors.btnSocial,
      paddingVertical: Spacing.width4,
      flexDirection: 'row',
      gap: Spacing.width8,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: Spacing.width8,
      height: Spacing.width8,
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
export default BannerUser;
