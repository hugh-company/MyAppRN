import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.background,
      // height: Spacing.height200,
    },
    title: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
    },
    description: {},
    viewLine: {
      width: Spacing.width32,
      height: 4,
      backgroundColor: themeColors.whiteColor,
      borderRadius: 4,
      alignSelf: 'center',
    },
    body: {
      padding: Spacing.width16,
    },
    list: {
      marginTop: Spacing.width16,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.width16,
      paddingHorizontal: Spacing.width8,
    },
    flag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
    },
    btnActive: {
      backgroundColor: themeColors.btnSocial,
      borderRadius: Spacing.width8,
    },
    textItem: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_400,
    },
  });
