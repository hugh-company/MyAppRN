import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    formLogin: {
      paddingTop: Spacing.height48,
    },
    profile: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.width16,
      marginTop: Spacing.height90,
    },
  });
