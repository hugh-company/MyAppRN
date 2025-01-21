import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    tab: {
      marginHorizontal: Spacing.width16,
    },
    titleLocation: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width16,
      textAlign: 'center',
      marginHorizontal: Spacing.width16,
      width: '70%',
    },
    desLocation: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      marginHorizontal: Spacing.width16,
      textAlign: 'center',
      width: '90%',
    },

    containerLocation: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: Spacing.width16,
    },
    btnLocation: {
      flex: 1,
      marginTop: Spacing.width32,
    },
    btnMessage: {
      width: Spacing.width40,
      height: Spacing.width40,

      alignItems: 'center',
      justifyContent: 'center',
    },
  });
