import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    modalContainer: {
      backgroundColor: themeColors.background,
    },
    line: {
      height: 5,
      width: Spacing.width36,
      borderRadius: Spacing.width2,
      backgroundColor: themeColors.border,
      alignSelf: 'center',
      position: 'absolute',
      top: 4,
    },
  });
