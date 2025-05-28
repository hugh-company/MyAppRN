import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.primary,
    },
    list: {
      paddingBottom: Spacing.height100,
      backgroundColor: themeColors.whiteColor,
    },
  });
