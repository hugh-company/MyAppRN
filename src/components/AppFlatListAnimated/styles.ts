import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    viewHeader: {
      flex: 1,
      paddingTop: Spacing.height15,
    },
  });
