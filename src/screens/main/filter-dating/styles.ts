import {FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    list: {flex: 1},
    btnFilter: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.width16,
    },
    iconLike: {
      width: Spacing.width99,
      height: Spacing.width99,
      borderRadius: Spacing.width99,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.primary,
    },
    btnFavorite: {
      width: Spacing.width78,
      height: Spacing.width78,
      borderRadius: Spacing.width78,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewEmpty: {
      flex: 1,

      alignItems: 'center',
      justifyContent: 'center',
    },
    txtNotFound: {
      ...FontWithFamily.FontWithFamily_500,
      marginTop: Spacing.width16,
      width: '80%',
      textAlign: 'center',
    },
    imageNotFound: {
      width: Spacing.width200,
      height: Spacing.width100,
    },
  });
