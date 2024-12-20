import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: Spacing.width4,
      marginLeft: Spacing.width16,
      overflow: 'hidden',
      width: Spacing.width240,
    },
    image: {
      width: Spacing.width240,
      height: Spacing.width320,
    },
    name: {
      marginVertical: Spacing.width8,
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      width: '100%',
    },
    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',

      marginBottom: Spacing.width16,
      gap: Spacing.width8,
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
      justifyContent: 'center',
      gap: 4,
    },
  });
