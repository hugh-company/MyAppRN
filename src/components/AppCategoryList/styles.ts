import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    contentContainer: {
      paddingHorizontal: Spacing.width16,
    },
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
      backgroundColor: themeColors.primary,
    },
    txtCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.subtile,
    },
    txtActiveCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.whiteColor,
      ...FontWithFamily.FontWithFamily_600,
    },
  });
