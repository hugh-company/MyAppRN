import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width24,
    },
    image: {
      width: Spacing.width200,
      height: Spacing.width230,
    },
    viewInfo: {
      gap: Spacing.width8,
      marginHorizontal: Spacing.width16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: FontSize.FontSize20,
      ...FontWithFamily.FontWithFamily_600,
    },
    description: {
      fontSize: FontSize.FontSize14,
      color: themeColors.text50,
      textAlign: 'center',
    },
  });
