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
    container: {},
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    btn: {
      width: WidthScreen,
      height: Spacing.height315,
    },
    image: {
      width: '100%',
      height: Spacing.height315,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',

      bottom: 10,
      alignSelf: 'center',
      backgroundColor: themeColors.btnSocial,
      padding: 4,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 4,
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
  });
