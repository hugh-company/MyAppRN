import {
  FontSize,
  FontWithFamily,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width32,
    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
    },
    images: {
      width: WidthScreen - Spacing.width100,
      height: WidthScreen - Spacing.width100,
    },
    btn: {
      alignSelf: 'center',
      width: Spacing.width177,
    },
  });
