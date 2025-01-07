import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},

    viewCategory: {
      marginVertical: Spacing.width16,
    },
    itemCategory: {
      height: Spacing.width40,
      // maxWidth: Spacing.width160,
      minWidth: Spacing.width70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Spacing.width20,

      paddingHorizontal: Spacing.width16,
    },
    btnActiveCategory: {
      backgroundColor: themeColors.whiteColor,
    },
    txtCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.subtile,
    },
    txtActiveCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_600,
    },
  });
