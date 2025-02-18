import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    list: {},
    inputSearch: {
      paddingHorizontal: Spacing.width16,
      paddingTop: Spacing.width16,
    },
    category: {
      // paddingLeft: Spacing.width16,
    },
    listCategory: {
      paddingLeft: Spacing.width16,
    },
    banner: {
      // paddingHorizontal: Spacing.width16,
    },
    listContainer: {
      flex: 1,
    },
    itemStyle: {
      width: Spacing.width120,
    },
  });
