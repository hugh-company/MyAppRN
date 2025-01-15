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
    },
    modalContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
      padding: Spacing.width16,
      marginTop: Spacing.height32,
      alignItems: 'center',
    },
    image: {
      width: Spacing.width92,
      height: Spacing.width92,
      marginTop: Spacing.height32,
    },
    title: {
      fontSize: FontSize.FontSize18,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    description: {
      fontSize: FontSize.FontSize14,
      color: themeColors.subtile,
      textAlign: 'center',
      marginTop: Spacing.height8,
    },
    input: {
      width: '100%',
      marginTop: Spacing.height16,
    },
    viewStar: {
      flexDirection: 'row',
      marginTop: Spacing.height16,
      gap: Spacing.width4,
    },
    star: {
      width: WidthScreen / 12,
      height: Spacing.width50,

      alignItems: 'center',
      justifyContent: 'center',
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
