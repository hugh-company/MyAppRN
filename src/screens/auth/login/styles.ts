import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
    },
    btnLogin: {
      width: Spacing.width145,
      alignSelf: 'center',
    },
    btnForgot: {
      alignSelf: 'center',
      marginTop: Spacing.width16,
    },
    txtForgot: {
      fontSize: FontSize.FontSize14,
      color: themeColors.txtLink,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewAreYouAccount: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.width32,
    },
    txtAreYouAccount: {
      ...FontWithFamily.FontWithFamily_400,
    },
    createAccount: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
  });
