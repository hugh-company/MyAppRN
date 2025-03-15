import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
    },
    btnSearch: {
      width: Spacing.width40,
      height: Spacing.width40,

      alignItems: 'center',
      justifyContent: 'center',
    },
    inputSearch: {
      paddingHorizontal: Spacing.width16,
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
  });
