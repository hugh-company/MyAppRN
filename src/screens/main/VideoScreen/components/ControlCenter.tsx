import { PauseIcon, PlayIcon, SkipBackwardIcon, SkipForwardIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

interface ControlCenterProps {
  isLoading: boolean;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onPlayPause: () => void;
  paused: boolean;
  isError?: boolean;
}

export const ControlCenter = ({ isLoading, isError, onPlayPause, onSkipBackward, onSkipForward, paused }: ControlCenterProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const scaleValue = useSharedValue(1);

  const handlePlayPausePress = () => {
    scaleValue.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPlayPause();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  if (isError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton} onPress={onSkipBackward}>
        <SkipBackwardIcon />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handlePlayPausePress}>
        <Animated.View style={[styles.controlButton, animatedStyle]}>
          {isLoading ? <ActivityIndicator /> : (paused ? <PlayIcon /> : <PauseIcon />)}
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.controlButton} onPress={onSkipForward}>
        <SkipForwardIcon />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
      ...StyleSheet.absoluteFillObject,
    },
    controlButton: {
      backgroundColor: themeColors.btnSocial,
      width: Spacing.width60,
      height: Spacing.width60,
      borderRadius: Spacing.width70,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

