import {
  FontSize,
  FontWithFamily,
  HeightScreen,
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
    },
    viewBackground: {
      borderBottomRightRadius: Spacing.height40,
      borderBottomLeftRadius: Spacing.height40,
      overflow: 'hidden',
    },
    headerBackground: {
      ...StyleSheet.absoluteFillObject,
      width: WidthScreen,
      height: HeightScreen / 2,
    }, // Added style for background

    header: {},
    logoContainer: {
      width: '100%',
      marginVertical: Spacing.width16,
    },
    images: {
      width: Spacing.width200,
      height: Spacing.height62,
    },
    txtTitle: {
      fontSize: FontSize.FontSize32,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
      width: '95%',
      position: 'absolute',
      bottom: Spacing.height100,
      left: Spacing.width12,
      right: Spacing.width12,
    },
  });
