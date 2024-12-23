import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: Spacing.width16,
    },
    btnCancel: {
      paddingVertical: Spacing.width12,
      paddingRight: Spacing.width16,
    },
    txtCancel: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    containerInput: {
      flex: 1,
    },
    input: {},
    filter: {
      flexDirection: 'row',

      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.width12,
      gap: Spacing.width4,
    },
    btnType: {
      flexDirection: 'row',
      gap: Spacing.width8,
      backgroundColor: themeColors.btnSocial,
      borderRadius: Spacing.width8,
      padding: Spacing.width4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtType: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.subtile,
    },
    btnArrange: {
      flexDirection: 'row',
      gap: Spacing.width8,
    },
    btnActive: {
      backgroundColor: themeColors.primary,
    },
  });
