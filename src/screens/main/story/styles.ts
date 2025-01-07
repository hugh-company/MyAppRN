import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    inputSearch: {
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
    },
    list: {},
    itemStyle: {
      width: Spacing.width120,
    },
  });
