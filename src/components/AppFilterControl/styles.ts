import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      padding: Spacing.width16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      width: '100%',
    },
    txtFilter: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.height16,
    },
    btnReset: {
      padding: Spacing.width8,
    },
    txtReset: {
      fontSize: FontSize.FontSize14,
      color: themeColors.primary,
    },
  });
