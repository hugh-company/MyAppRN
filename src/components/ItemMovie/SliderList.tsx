import { RightIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ButtonNavigationInterface, PostTypeKey, TabInterface } from '@types';
import { goToDetail, goToListView } from '@utils';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
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
  const scrollX = useSharedValue(0);
  const filteredData = useMemo(() => {
    return data.filter((item) => (item?.items || []).length > 0);
  }, [data]);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = filteredData?.length > 1 ? event.contentOffset.x : 0;
  });

  const handleMomentumScrollEnd = useCallback((event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / widthItem);
    setCurrentIndex(index);
  }, []);

  const renderItem = useCallback(({ item }: { item: TabInterface }) => {
    if ((item?.items || []).length === 0) { return null; }
    const featuredItem = item?.items?.[0];
    return (
      <View style={styles.itemType}>
        <TouchableOpacity>
          <AppImage
            uri={featuredItem?.feature?.path}
            style={styles.imageContainer}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)', 'black']} // Adjusted gradient for half-item effect
            style={[styles.infoCategory, { height: '50%' }]} // Restrict gradient to bottom half
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.viewInfoPost}>
              <AppText style={styles.txtType}>{item.name}</AppText>
              <FlatList
                data={item?.items || []}
                horizontal // Ensure the list is horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: movieItem }) => (
                  <TouchableOpacity
                    onPress={() => {
                      goToDetail({ item: movieItem, type });
                    }}
                    style={styles.itemContainer}
                  >
                    <AppImage
                      uri={movieItem?.feature?.square}
                      style={styles.scrollImage}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => `item_${item.id}`}
                contentContainerStyle={styles.centeredList} // Add centering style
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }, [styles, button, title, type]);

  if (!filteredData || filteredData.length === 0) {
    return null;
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>{title}</AppText>
        <TouchableOpacity onPress={() => onViewMore ? onViewMore() : goToListView({
          ...button,
          label: title,
        })
        } style={styles.btnViewMore}>
          {/* <AppText style={styles.txtViewMore}>{button?.label}</AppText> */}
          <RightIcon />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={filteredData}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list_item_slider_${index}`}
        // initialNumToRender={3}
        getItemLayout={(data, index) => ({
          length: widthItem,
          offset: widthItem * index,
          index,
        })}
        initialScrollIndex={currentIndex}
        // onScroll={onScroll}
        // onMomentumScrollEnd={handleMomentumScrollEnd}

        scrollEventThrottle={16}
      />
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

      width: widthItem,
      borderRadius: Spacing.width8,
      overflow: 'hidden',
    },
    itemsListContainer: {
      paddingVertical: Spacing.width8,
      gap: Spacing.width12,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'red',
    },
    itemContainer: {

    },
    scrollImage: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.width7,
    },
    imageContainer: {
      width: widthItem,
      height: Spacing.height375,
    },
    viewType: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.width12,
    },
    txtType: {
      fontSize: FontSize.FontSize24,
      color: themeColors.whiteColor,
      ...FontWithFamily.FontWithFamily_600,
      width: '100%',
      textAlign: 'left',
      paddingHorizontal: Spacing.width16,

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
    //
    infoCategory: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    viewInfoPost: {
      margin: Spacing.width8,
      flex: 1,
      gap: Spacing.width16,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

    },
    centeredList: {

      justifyContent: 'center', // Center the list items horizontally
      gap: Spacing.width8,

      height: Spacing.width40,

    },
  });
