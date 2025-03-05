import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: Spacing.width4,
      marginLeft: Spacing.width16,
      overflow: 'hidden',
      width: Spacing.width200,
    },
    image: {
      width: Spacing.width200,
      height: Spacing.width280,
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
