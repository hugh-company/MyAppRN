import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    gradientBackground: {},
    list: {},
    header: {},
    inputSearch: {
      paddingHorizontal: Spacing.width16,
      marginTop: Spacing.width16,
    },
    category: {
      paddingHorizontal: Spacing.width16,
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
