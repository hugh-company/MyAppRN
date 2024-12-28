import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      marginBottom: Spacing.height16,
    },
    banner: {
      marginBottom: Spacing.height36,
    },
    list: {
      marginHorizontal: Spacing.width16,
    },
  });
