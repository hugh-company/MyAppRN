import {FontSize, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    body: {
      flex: 1,
      padding: 16,
      marginTop: Spacing.height50,
    },
    txtDescription: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      color: themeColors.whiteColor,
      fontSize: FontSize.FontSize12,
    },
  });
