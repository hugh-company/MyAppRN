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
      marginVertical: Spacing.width8,
    },
    btnSearch: {
      width: Spacing.width35,
      height: Spacing.width35,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
