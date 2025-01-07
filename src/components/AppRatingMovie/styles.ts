import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
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
  });
