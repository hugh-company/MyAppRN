import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt: {
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    btnIcon: {},
    containerSizeSmall: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
      backgroundColor: themeColors.btnSocial,
      padding: Spacing.width16,
      borderRadius: Spacing.width16,

      height: '100%',
      width: Spacing.width106,
    },
    containerSizeLarge: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
      backgroundColor: themeColors.btnSocial,
      padding: Spacing.width16,
      borderRadius: Spacing.width16,
      width: '100%',
      height: '100%',
    },
    viewIconSizeSmall: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.width28,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    viewIconSizeLarge: {
      width: Spacing.width57,
      height: Spacing.width57,
      borderRadius: Spacing.width28,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewMore: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width2,
    },
    titleSizeSmall: {
      fontSize: FontSize.FontSize13,
    },
    titleSizeLarge: {
      fontSize: FontSize.FontSize14,
    },
  });
