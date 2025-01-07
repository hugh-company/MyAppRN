import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      marginHorizontal: Spacing.width16,
    },
    description: {
      marginTop: Spacing.width8,
      marginHorizontal: Spacing.width16,
      paddingBottom: Spacing.width8,
    },
    body: {
      marginHorizontal: Spacing.width16,
      paddingTop: Spacing.width32,
    },
    btnStart: {
      width: Spacing.width121,
      alignSelf: 'center',
    },
    bottom: {
      // flex: 1,
      justifyContent: 'flex-end',
      marginBottom: Spacing.width32,
      paddingTop: Spacing.width16,
    },
  });
