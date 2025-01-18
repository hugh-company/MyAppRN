import { BASE_IMAGE_URL } from '@api';
import { Spacing } from '@theme';
import React, { useEffect, useState } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface SlideImageProps {
  data: string[];
  style?: StyleProp<ViewStyle>
}

export function SlideImage(props: SlideImageProps) {
  const { data, style } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateYAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  useEffect(() => {
    translateYAnim.setValue(-Spacing.width56);
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={{
          uri: BASE_IMAGE_URL + data[currentIndex],
          cache: 'force-cache',
        }}
        style={[styles.image, { transform: [{ translateY: translateYAnim }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.width56,
    height: Spacing.width56,
    borderRadius: Spacing.width56,
    overflow: 'hidden',

  },
  image: {
    width: Spacing.width56,
    height: Spacing.width56,
    resizeMode: 'cover',
  },
});
