import { CloseBigIcon, HeadIcon, LocationIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { useLocation } from '@hooks';
import { Spacing, useTheme, WidthScreen } from '@theme';
import { UserFindInterface } from '@types';
import { getAge } from '@utils';
import { t } from 'i18next';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlatList, PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { EmptyUser } from './components/EmptyUser';
import { createStyles } from './styles';

const width = WidthScreen;
const SWIPE_THRESHOLD = 120; // ngưỡng vuốt để tính là swipe
const SPRING_CONFIG = { stiffness: 300, damping: 20, overshootClamping: true };

export interface AppSwipeProfileProps {
  items: UserFindInterface[];
  onSwipe: (type: 'like' | 'dislike' | 'superlike', user: UserFindInterface) => void;
  onDetailUser?: (user: UserFindInterface) => void; // added callback for detail view
}

const AppSwipeProfile = forwardRef(({ items, onSwipe, onDetailUser }: AppSwipeProfileProps, ref) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const { getDistanceLocation } = useLocation();
  const [profiles, setProfiles] = useState(items as UserFindInterface[]);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const flatListRef = useRef<FlatList>(null);
  const isRemoving = useRef(false);
  useEffect(() => {
    setProfiles(items || []);
  }, [items]);
  // Hàm xóa profile đầu tiên khỏi danh sách
  const removeTopProfile = (action: 'like' | 'dislike' | 'superlike') => {
    if (isRemoving.current) { return; }
    isRemoving.current = true;

    const currentProfile = profiles[0];
    setProfiles((prev) => prev.slice(1));
    console.log({ currentProfile });

    // Gọi hàm callback onSwipe để thông báo action
    onSwipe(action, currentProfile);
    // Reset lại giá trị cho thẻ kế tiếp
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;

    isRemoving.current = false;
  };

  useImperativeHandle(ref, () => ({
    triggerSwipe: (action: 'like' | 'dislike' | 'superlike') => {
      if (profiles.length === 0) { return; }
      if (action === 'dislike') {
        translateX.value = withSpring(-width * 1.5, SPRING_CONFIG, (finished) => {
          if (finished) { runOnJS(removeTopProfile)(action); }
        });
      } else if (action === 'like') {
        translateX.value = withSpring(width * 1.5, SPRING_CONFIG, (finished) => {
          if (finished) { runOnJS(removeTopProfile)(action); }
        });
      } else if (action === 'superlike') {
        translateY.value = withSpring(-width * 1.5, SPRING_CONFIG, (finished) => {
          if (finished) { runOnJS(removeTopProfile)(action); }
        });
      }
    },
  }));

  const callDetail = () => {
    if (onDetailUser && profiles.length > 0) {
      onDetailUser(profiles[0]);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      // Cập nhật vị trí thẻ theo tay kéo
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      // Hiệu ứng xoay nhẹ khi vuốt (giữ nguyên hiệu ứng hiện tại nếu có)
      rotation.value = translateX.value * 0.0015;  // tùy chỉnh hệ số xoay
    },
    onEnd: (event) => {
      // Check upward swipe for detail action: swipe up with minimal horizontal movement
      if (translateY.value < -SWIPE_THRESHOLD && Math.abs(translateX.value) < 50) {
        runOnJS(callDetail)();
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
        rotation.value = withSpring(0, SPRING_CONFIG);
      } else if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const traveledX = translateX.value;
        const toX = traveledX > 0 ? width * 1.5 : -width * 1.5;
        const action = traveledX > 0 ? 'dislike' : 'like';
        translateX.value = withSpring(toX, {
          ...SPRING_CONFIG,
          velocity: event.velocityX,  // dùng vận tốc vuốt hiện tại cho tự nhiên
        }, (isFinished) => {
          if (isFinished) {
            // Xóa item khỏi danh sách ngay khi animation kết thúc
            runOnJS(removeTopProfile)(action);
          }
        });
        // Optional: cũng có thể animate translateY ra xa hơn nếu muốn
        translateY.value = withSpring(event.translationY * 2, SPRING_CONFIG);
      } else {
        // Nếu vuốt không đủ xa, đưa thẻ trở về vị trí cũ
        translateX.value = withSpring(0, SPRING_CONFIG);
        translateY.value = withSpring(0, SPRING_CONFIG);
        rotation.value = withSpring(0, SPRING_CONFIG);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}rad` },
      ],
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

  // Memo hoá renderItem
  const renderItem = useCallback(({ item }: any) => (
    <TouchableOpacity activeOpacity={1} onPress={() => onDetailUser?.(item)} style={[styles.cardContent]}>
      {/* <ListGalleries data={item.galleries} /> */}
      <AppImage uri={item.avatar} style={styles.innerBannerImage} />
      <View style={styles.info}>
        <AppText style={styles.name}>{[item.fullname, getAge(item.birthday)].join(', ')}</AppText>
        {item.job && <AppText style={styles.profession}>{item.job}</AppText>}
      </View>
      <View style={styles.viewLocation}>
        <LocationIcon />
        <AppText style={styles.txtLocation}>{getDistanceLocation(item.location)}</AppText>
      </View>
    </TouchableOpacity>
  ), [getDistanceLocation, styles]);

  return (
    <PanGestureHandler onGestureEvent={profiles.length > 0 ? gestureHandler : undefined}>
      <Animated.View style={[styles.card, cardStyle]}>
        <FlatList
          ref={flatListRef}
          data={profiles}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyUser />}
          renderItem={renderItem}
          // scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={true}
          initialNumToRender={1}
        />
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
    </PanGestureHandler>
  );
});

export default AppSwipeProfile;
