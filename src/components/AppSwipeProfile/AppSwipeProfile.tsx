import { CloseBigIcon, HeadIcon, LocationIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { HeightScreen, Spacing, useTheme, WidthScreen } from '@theme';
import { UserFindInterface } from '@types';
import { getAge } from '@utils';
import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { createStyles } from './styles';
const width = WidthScreen;
export interface AppSwipeProfileProps {
  item: UserFindInterface
  onSwipe: (type: 'like' | 'dislike') => void;

}
const AppSwipeProfile = ({ item, onSwipe }: AppSwipeProfileProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const translateX = useSharedValue(0);

  const isVisible = useSharedValue(true);
  const heightBanner = Platform.OS === 'android' ? HeightScreen * 0.8 : HeightScreen * 0.7;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(item?.personal.galleries);

  const flatListRef = useRef<FlatList>(null);
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });


  const handleSwipe = (type: 'like' | 'dislike') => {
    runOnJS(onSwipe)(type);
    runOnJS(setItems)((prevItems) => {
      const newItems = prevItems.filter((_, index) => index !== currentIndex);
      if (newItems.length === 0) {
        isVisible.value = false; // Hide the card if no items are left
      }
      return newItems;
    });
    translateX.value = 0; // Reset translateX after swipe
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: () => {
      const threshold = width / 3;
      if (translateX.value > threshold) {
        translateX.value = withSpring(width, {}, () => runOnJS(handleSwipe)('like')); // Vuốt sang phải
      } else if (translateX.value < -threshold) {
        translateX.value = withSpring(-width, {}, () => runOnJS(handleSwipe)('dislike')); // Vuốt sang trái
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const translateXValue = translateX.value;
    return {
      transform: [
        { translateX: translateXValue },
        { rotateZ: `${translateXValue / 20}deg` },
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    const translateXValue = translateX.value;
    return {
      opacity: translateXValue > 50 ? 1 : 0,
    };
  });

  const shadowImage = useAnimatedStyle(() => {
    const translateXValue = translateX.value;
    return {
      borderColor: translateXValue > 50 ? 'rgba(209, 16, 48, 1)' : 'transparent',
      borderWidth: translateXValue > 50 ? 2 : 0,
      elevation: translateXValue > 50 ? 10 : 0,
    };
  });

  const dislikeOpacity = useAnimatedStyle(() => {
    const translateXValue = translateX.value;
    return {
      opacity: translateXValue < -50 ? 1 : 0,
    };
  });

  const renderItemBanner = ({ item, index }: any) => (
    <View key={index} style={[styles.btn, { height: heightBanner }]}>
      <Animated.View style={[styles.btn]}>
        <AppImage uri={item} style={[styles.image, { height: heightBanner }]} />
      </Animated.View>
    </View>
  );


  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, shadowImage, animatedStyle, { height: heightBanner, display: isVisible.value ? 'flex' : 'none' }]}>
        <FlatList
          ref={flatListRef}
          data={items}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={renderItemBanner}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          getItemLayout={(data, index) => (
            { length: heightBanner || HeightScreen, offset: (heightBanner || HeightScreen) * index, index }
          )}
        />
        {items?.length > 1 && <View style={styles.dotsContainer}>
          <View style={styles.dotsView}>
            {items.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>}

        <View style={styles.info}>
          <AppText style={styles.name}>{[item?.fullname, getAge(item?.birthday)].join(', ')}</AppText>
          <AppText style={styles.profession}>{item?.personal?.job}</AppText>
        </View>
        {/* location */}
        <View style={styles.viewLocation}>
          <LocationIcon />
          <AppText style={styles.txtLocation}>1 km</AppText>
        </View>
        {/* Like/Dislike Labels */}
        <Animated.View style={[styles.likeContainer, likeOpacity]}>
          <View style={styles.btnLike}>
            <HeadIcon height={Spacing.width48} width={Spacing.width48} />
            <AppText style={styles.likeText}>{t('like')}</AppText>
          </View>
        </Animated.View>
        <Animated.View style={[styles.dislikeContainer, dislikeOpacity]}>
          <View style={styles.btnDislike}>
            <CloseBigIcon />
            <AppText style={styles.dislikeText}>{t('dislike')}</AppText>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler >
  );
};

export default AppSwipeProfile;
