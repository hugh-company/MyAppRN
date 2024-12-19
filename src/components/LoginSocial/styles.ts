import {Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width32,
      alignItems: 'center',
      marginBottom: Spacing.width16,
    },
    btn: {
      backgroundColor: themeColors.btnSocial,
      width: Spacing.width56,
      height: Spacing.width56,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Spacing.width56,
    },
    viewIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width16,
    },
    viewLine: {
      flex: 1,
      backgroundColor: themeColors.border,
      height: 1,
    },
    viewOr: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width16,
      marginHorizontal: Spacing.width16,
    },
  });
