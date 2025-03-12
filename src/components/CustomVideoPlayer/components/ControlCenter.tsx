import { PauseIcon, PlayIcon, SkipBackwardIcon, SkipForwardIcon, SkipNextIcon, SkipPreviousIcon } from '@assets';
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
  currentTime?: number;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  typeMovie: 'tvseries' | 'movies';
  isSkipNext?: boolean;
  isSkipPrevious?: boolean;

}

export const ControlCenter = ({ isLoading, isError,
  onPlayPause, onSkipBackward, onSkipForward, paused,
  onSkipNext, onSkipPrevious, typeMovie, isSkipNext, isSkipPrevious }: ControlCenterProps) => {
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
      {typeMovie === 'tvseries' && <TouchableOpacity
        style={[styles.controlButton, { width: 50, height: 50 }, !isSkipPrevious && { opacity: 0.5 }]}
        onPress={onSkipPrevious}
        disabled={!isSkipPrevious}
      // disabled={!currentTime || currentTime <= 0}
      >
        <SkipPreviousIcon />
      </TouchableOpacity>}
      <TouchableOpacity
        style={[styles.controlButton, { width: 50, height: 50 }]}
        onPress={onSkipBackward}
      // disabled={!currentTime || currentTime <= 0}
      >
        <SkipBackwardIcon style={{ backgroundColor: 'red' }} />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handlePlayPausePress}>
        <Animated.View style={[styles.controlButton, animatedStyle, { width: 50, height: 50 }]}>
          {isLoading ? <ActivityIndicator /> : (paused ? <PlayIcon /> : <PauseIcon />)}
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={[styles.controlButton, { width: 50, height: 50 }]}
        onPress={onSkipForward}
      // disabled={!currentTime || currentTime >= 100}
      >
        <SkipForwardIcon />
      </TouchableOpacity>

      {typeMovie === 'tvseries' && <TouchableOpacity
        style={[styles.controlButton, { width: 50, height: 50 }, !isSkipNext && { opacity: 0.5 }]}
        onPress={onSkipNext}
        disabled={!isSkipNext}
      // disabled={!currentTime || currentTime <= 0}
      >
        <SkipNextIcon />
      </TouchableOpacity>}
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
    },
    controlButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',

      borderRadius: Spacing.width70,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

