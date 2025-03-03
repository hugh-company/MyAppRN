import {
  ColorsApp,
  FontSize,
  FontWithFamily,
  Spacing,
  ThemeColors,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    optionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
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
    countMessage: {
      position: 'absolute',
      top: Spacing.width2,
      right: Spacing.width2,
      backgroundColor: ColorsApp.primary,
      width: Spacing.width16,
      height: Spacing.width16,
      borderRadius: Spacing.width16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtMessage: {
      fontSize: FontSize.FontSize12,
    },
  });
