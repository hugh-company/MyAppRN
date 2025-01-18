import { RightIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ButtonNavigationInterface, PostTypeKey, TabInterface } from '@types';
import { goToDetail, goToListView } from '@utils';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SliderListProps } from './SliderList.type';

interface Props extends SliderListProps {
  style?: StyleProp<ViewStyle>;
  onViewMore?: () => void;
  type: PostTypeKey;
  button?: ButtonNavigationInterface
}
const widthItem = Spacing.width240;
const SliderList = React.memo(({ style, title, data, onViewMore, type, button }: Props) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50, minimumViewTime: 300 });
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onViewRef = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  }, []);

  const renderItem = useCallback(({ item, index }: { item: TabInterface, index: number }) => (
    <View style={styles.itemType}>
      <FlatList
        style={styles.listMovie}
        scrollEnabled={false}
        numColumns={2}
        data={item.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            goToDetail({ item, type });
          }} style={[styles.btnMovie, index % 2 === 0 && { marginRight: Spacing.width16 }]}>
            <AppImage uri={item.feature.square} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => {
        console.log({ item });
        goToListView({
          ...button,
          keyCategory: item.slug,
          label: title,
        });
      }} style={styles.viewType}>
        <AppText style={styles.txtType}>{item.name}</AppText>
        <RightIcon />
      </TouchableOpacity>
    </View>
  ), [styles]);

  if (!data) { return null; }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>{title}</AppText>
        <TouchableOpacity onPress={() => onViewMore ? onViewMore() : goToListView({
          ...button,
          label: title,
        })
        } style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>{button?.label}</AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={data || []}
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => ({
          length: widthItem,
          offset: widthItem * index,
          index,
        })}
        initialScrollIndex={currentIndex}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              scrollX.value / widthItem,
              [index - 1, index, index + 1],
              [0.3, 1, 0.3],
              Extrapolate.CLAMP
            );
            return { opacity };
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                animatedDotStyle,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
});

export default SliderList;

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.width24,
      marginHorizontal: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize16,
      color: '#EDEDED',
      ...FontWithFamily.FontWithFamily_600,
    },
    image: {
      width: Spacing.width92,
      height: Spacing.width92,
      borderRadius: Spacing.width4,
    },
    btnViewMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtViewMore: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Spacing.width8,
      alignSelf: 'center',
      backgroundColor: themeColors.btnSocial,
      padding: 4,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },
    itemType: {
      borderRadius: Spacing.width12,
      borderWidth: 1,
      borderColor: themeColors.btnSocial,
      width: widthItem,
      marginLeft: Spacing.width16,
      padding: Spacing.width16,

    },
    viewType: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.width12,

    },
    txtType: {
      fontSize: FontSize.FontSize14,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
    },
    btnMovie: {
      marginBottom: Spacing.width16,
    },
    listMovie: {
      // Add any necessary styles here
    },
  });
