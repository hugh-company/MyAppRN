import { PauseIcon, PlayIcon, SkipBackwardIcon, SkipForwardIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

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

  if (isError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton} onPress={onSkipBackward}>
        <SkipBackwardIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onPlayPause}>
        {isLoading ? <ActivityIndicator /> : (paused ? <PlayIcon /> : <PauseIcon />)}
      </TouchableOpacity>
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
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

