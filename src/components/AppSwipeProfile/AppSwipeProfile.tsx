import { CloseBigIcon, HeadIcon, LocationIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { useLocation } from '@hooks';
import { HeightScreen, Spacing, useTheme, WidthScreen } from '@theme';
import { UserFindInterface } from '@types';
import { getAge } from '@utils';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { createStyles } from './styles';
const width = WidthScreen;
export interface AppSwipeProfileProps {
  item: UserFindInterface
  onSwipe: (type: 'like' | 'dislike' | 'superlike') => void;

}
const AppSwipeProfile = forwardRef(({ item, onSwipe }: AppSwipeProfileProps, ref) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const translateX = useSharedValue(0);
  const { getDistanceLocation } = useLocation();
  const isVisible = useSharedValue(true);
  const heightBanner = Platform.OS === 'android' ? HeightScreen * 0.8 : HeightScreen * 0.7;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(item.galleries);

  const flatListRef = useRef<FlatList>(null);
  const onViewRef = useRef(
    debounce(({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    }, 200)
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });


  const handleSwipe = (type: 'like' | 'dislike' | 'superlike') => {
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

  useImperativeHandle(ref, () => ({
    triggerSwipe: (action) => {
      if (action === 'like') {
        translateX.value = withSpring(width, { damping: 15, stiffness: 80 }, () => runOnJS(handleSwipe)('like'));
      } else if (action === 'dislike') {
        translateX.value = withSpring(-width, { damping: 15, stiffness: 80 }, () => runOnJS(handleSwipe)('dislike'));
      } else if (action === 'superlike') {
        // Add your super like logic here
        translateX.value = withSpring(width, { damping: 15, stiffness: 80 }, () => runOnJS(handleSwipe)('superlike'));
      }
    },
  }));

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
        translateX.value = withSpring(width, { damping: 15, stiffness: 80 }, () => runOnJS(handleSwipe)('like')); // Vuốt sang phải
      } else if (translateX.value < -threshold) {
        translateX.value = withSpring(-width, { damping: 15, stiffness: 80 }, () => runOnJS(handleSwipe)('dislike')); // Vuốt sang trái
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 80 });
      }
    },
  });
  const rotateZ = useDerivedValue(() => `${translateX.value / 20}deg`, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {

    return {
      transform: [
        { translateX: translateX.value },
        { rotateZ: rotateZ.value },
      ],
      borderColor: translateX.value > 50 ? 'rgba(209, 16, 48, 1)' : 'transparent',
      borderWidth: translateX.value > 50 ? 2 : 0,
      elevation: translateX.value > 50 ? 10 : 0,
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    return {
      opacity: translateX.value > 50 ? 1 : 0,
      transform: [{ translateX: translateX.value > 50 ? 50 : 0 }],
    };
  });


  const dislikeOpacity = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -50 ? 1 : 0,
      transform: [{ translateX: translateX.value < -50 ? -50 : 0 }],
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
      <Animated.View style={[styles.card, animatedStyle, { height: heightBanner, display: isVisible.value ? 'flex' : 'none' }]}>
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
          {item?.job && <AppText style={styles.profession}>{item?.job}</AppText>}
        </View>
        {/* location */}
        <View style={styles.viewLocation}>
          <LocationIcon />
          <AppText style={styles.txtLocation}>{getDistanceLocation(item?.location)}</AppText>
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
});

export default AppSwipeProfile;
