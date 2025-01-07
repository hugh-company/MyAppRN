import {FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    toggleText: {
      color: themeColors.primary,
      textAlign: 'center',
    },
    overlayButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 5,
    },
    content: {
      overflow: 'hidden',
      // height: Spacing.height100,
    },
    btnMore: {
      alignItems: 'center',

      paddingVertical: Spacing.height12,
    },
    txtMore: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
  });
