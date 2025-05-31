import { MasCotIcon } from '@assets';
import { AppImage } from '@components';
import { Spacing, ThemeColors, useTheme } from '@theme';
import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native';

const BUTTON_SIZE = 64; // iconContainer: borderRadius: 32, padding: 16 => 32*2=64
const BOTTOM_MARGIN = 100;
const RIGHT_MARGIN = 16;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const initialX = SCREEN_WIDTH - BUTTON_SIZE - RIGHT_MARGIN;
const initialY = SCREEN_HEIGHT - BUTTON_SIZE - BOTTOM_MARGIN;

export const PhoneCallFloatingButton = ({ onPress }: { onPress?: () => void }) => {
  const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current; // Thêm cho hiệu ứng tần số
  const position = useRef({ x: 20, y: 100 });
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  // Lặp animation rung lắc
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -1, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ])
    ).start();
  }, [shakeAnim]);

  // Lặp animation tần số
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [waveAnim]);

  // PanResponder cho phép kéo thả
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: position.current.x, y: position.current.y });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const x = (pan.x as any)._value;
        const y = (pan.y as any)._value;
        position.current.x = x;
        position.current.y = y;
      },
    })
  ).current;

  React.useEffect(() => {
    const xListener = pan.x.addListener(({ value }) => {
      position.current.x = value;
    });
    const yListener = pan.y.addListener(({ value }) => {
      position.current.y = value;
    });
    return () => {
      pan.x.removeListener(xListener);
      pan.y.removeListener(yListener);
    };
  }, [pan.x, pan.y]);

  return (
    <Animated.View
      style={[
        styles.fab,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            {
              rotate: shakeAnim.interpolate({
                inputRange: [-1, 1],
                outputRange: ['-10deg', '10deg'],
              })
            },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Hiệu ứng tần số */}
      {/* <Animated.View
        pointerEvents="none"
        style={[
          styles.wave,
          {
            opacity: waveAnim.interpolate({
              inputRange: [0, 0.7, 1],
              outputRange: [0.5, 0.3, 0],
            }),
            transform: [
              {
                scale: waveAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2.5],
                }),
              },
            ],
          },
        ]}
      /> */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          {/* <LinearGradient
            colors={["#4ABAB9", themeColors.primary]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
            pointerEvents="none"
          /> */}
          <AppImage defaultSource={MasCotIcon} style={{ width: Spacing.width50, height: Spacing.width72 }} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10,
    // Không thêm alignItems, justifyContent, bottom, right để button di chuyển tự do
  },
  wave: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: themeColors.primary,
    alignSelf: 'center',
  },
  iconContainer: {
    // backgroundColor: themeColors.primary,
    borderRadius: 32,
    padding: 16,

    overflow: 'hidden',
  },
});

export default PhoneCallFloatingButton;
