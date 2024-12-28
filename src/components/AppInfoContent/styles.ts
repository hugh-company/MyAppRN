import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {},
    viewRow: {
      alignItems: 'center',

      gap: 4,
    },
    btnIcon: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.width40,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoRow: {
      flexDirection: 'row',
      marginTop: Spacing.width24,
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.width24,
      borderBottomWidth: 0.5,
      borderBlockColor: themeColors.btnSocial,
      paddingBottom: Spacing.width16,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
      color: themeColors.onSurface,
    },
    info1: {
      flex: 1,
      gap: Spacing.width8,
    },
    info2: {
      flex: 1.5,
      gap: Spacing.width8,
    },
    titleInfo: {
      fontSize: FontSize.FontSize12,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
    },
    valueInfo: {
      color: themeColors.onSurface,
    },
    titleContent: {
      fontSize: FontSize.FontSize16,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
      marginBottom: Spacing.width8,
    },
    txtDescription: {
      color: themeColors.onSurface,
    },
    viewContent: {
      marginTop: Spacing.width24,
    },
  });
