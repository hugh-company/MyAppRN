import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    title: {
      color: themeColors.text,
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width16,
    },
    list: {
      marginHorizontal: Spacing.width16,
    },
  });
