import { Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
export interface ButtonActionProps {
  Icon: any;
  onPress: () => void;
}

export function ButtonAction(props: ButtonActionProps) {
  const { Icon, onPress } = props;
  const scale = useSharedValue(1);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress()}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={animatedStyle}>
        <Icon />
      </Animated.View>
    </TouchableOpacity>
  );
}
const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      width: Spacing.width30,
      height: Spacing.width30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
