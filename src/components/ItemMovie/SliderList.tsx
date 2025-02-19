import { RightIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ButtonNavigationInterface, PostTypeKey, TabInterface } from '@types';
import { goToDetail, goToListView } from '@utils';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SliderListProps } from './SliderList.type';

interface Props extends SliderListProps {
  style?: StyleProp<ViewStyle>;
  onViewMore?: () => void;
  type: PostTypeKey;
  button?: ButtonNavigationInterface;
}

const widthItem = Spacing.width240;
const SliderList = ({ style, title, data, onViewMore, type, button }: Props) => {
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50, minimumViewTime: 300 });
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = data?.length > 1 ? event.contentOffset.x : 0;
  });

  const onViewRef = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && flatListRef) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  }, []);


  const renderItem = useCallback(({ item }: { item: TabInterface }) => {
    return (
      <View style={styles.itemType}>
        <View style={styles.listMovie}>
          {item?.items.map((movieItem, index) => (
            <TouchableOpacity
              key={movieItem.id.toString()}
              onPress={() => {
                goToDetail({ item: movieItem, type });
              }}
              style={[styles.btnMovie, index % 2 === 0 && { marginRight: Spacing.width16 }]}
            >
              <AppImage uri={movieItem.feature.square} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            goToListView({
              ...button,
              keyCategory: item.slug,
              label: title,
            });
          }}
          style={styles.viewType}
        >
          <AppText style={styles.txtType}>{item.name}</AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
    );
  }, [styles, button, title, type]);

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
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list_item_slider_${index}`}
        // initialNumToRender={3}
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
      {data.length > 1 && (
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default memo(SliderList);

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
    containerStyle: {
      flexGrow: 1,
      gap: Spacing.width16,
      paddingHorizontal: Spacing.width16,
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

      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  });
