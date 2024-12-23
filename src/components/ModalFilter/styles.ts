import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
    },
    content: {
      margin: 0,

      // Add this line to round the top corners
    },
    list: {
      backgroundColor: '#C8C7C8',
      borderRadius: Spacing.width12,
      marginBottom: Spacing.width8,
    },
    modal: {
      backgroundColor: 'transparent',
    },
    cancel: {
      backgroundColor: themeColors.whiteColor,
      borderRadius: Spacing.width16,
    },
    txtCancel: {
      color: themeColors.txtLink,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.btnSocial,
    },
    item: {
      height: Spacing.height50,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBlockColor: '#9B9B9B',
    },
    txtItem: {
      color: themeColors.btnSocial,
    },
  });
