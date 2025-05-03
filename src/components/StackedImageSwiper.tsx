import { AppImage } from '@components';
import { Spacing, useTheme } from '@theme';
import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

interface StackedImageSwiperProps {
  data: { uri: string }[];
}

const SWIPE_THRESHOLD = 100;

export const StackedImageSwiper = ({ data }: StackedImageSwiperProps) => {
  const { themeColors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // Kích thước card đầu tiên
  const BASE_WIDTH = 190.04;
  const BASE_HEIGHT = 296;
  const CARD_OFFSET = 10;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({ x: position.x._value, y: position.y._value });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        position.flattenOffset();
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: gesture.dx > 0 ? 500 : -500, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex((prev) => prev + 1);
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const currentCards = data.slice(currentIndex);

  return (
    <View style={styles.container}>
      {currentCards.map((item, index) => {
        if (index === 0) {
          const rotate = position.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-15deg', '0deg', '15deg'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={currentIndex}
              {...panResponder.panHandlers}
              style={[
                styles.card,
                {
                  width: BASE_WIDTH,
                  height: BASE_HEIGHT,
                  transform: [
                    ...position.getTranslateTransform(),
                    { rotate },
                  ],
                  zIndex: currentCards.length,
                },
              ]}
            >
              <AppImage uri={item.uri} style={styles.image} />
            </Animated.View>
          );
        } else {
          const scale = 1 - index * 0.03;
          const offsetY = index * CARD_OFFSET;
          const offsetX = index * (CARD_OFFSET / 2);
          return (
            <View
              key={currentIndex + index}
              style={[
                styles.card,
                {
                  width: BASE_WIDTH * scale,
                  height: BASE_HEIGHT * scale,
                  position: 'absolute',
                  top: offsetY,
                  left: offsetX,
                  zIndex: currentCards.length - index,
                },
              ]}
            >
              <AppImage uri={item.uri} style={styles.image} />
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 210, // BASE_WIDTH + extra offset to accommodate overlapping cards
    height: 320, // BASE_HEIGHT + extra offset
    alignSelf: 'center',
  },
  card: {
    borderRadius: Spacing.width16,
    overflow: 'hidden',
    backgroundColor: '#ccc', // placeholder color
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
