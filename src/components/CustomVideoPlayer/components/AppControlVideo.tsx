import { Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface AppControlVideoProps {
  isLoading: boolean;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onPlayPause: () => void;
  paused: boolean;
  isError?: boolean;
  currentTime?: number;
}

export function AppControlVideo(props: AppControlVideoProps) {
  const { } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container} />
  );
}
const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {

      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnBack: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      // backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
