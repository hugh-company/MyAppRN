import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: Spacing.width4,
      marginLeft: Spacing.width16,
      width: Spacing.width240,
      gap: Spacing.width8,
    },
    image: {
      width: Spacing.width240,
      height: Spacing.width320,
      borderRadius: Spacing.width4,
    },
    name: {
      marginVertical: Spacing.width8,
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    director: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,
      marginTop: 4,
    },
    duration: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,
    },
    viewOption: {
      gap: 4,
      flexDirection: 'row',
    },
    txtView: {
      fontSize: FontSize.FontSize14,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 4,
    },
    viewInfo: {
      flex: 1,
      justifyContent: 'space-between',
    },
  });
