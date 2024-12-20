import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: Spacing.width16,
    },
    list: {},
    item: {
      flex: 1,
      justifyContent: 'space-between',
    },
    columnWrapper: {
      gap: Spacing.width16,
      marginBottom: Spacing.width16,
    },
    image: {
      height: Spacing.width172,
      width: '100%',
      borderRadius: Spacing.width4,
      overflow: 'hidden',
    },
    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',

      marginBottom: Spacing.width16,
      gap: Spacing.width8,
    },
    txtView: {
      fontSize: FontSize.FontSize10,
    },
    txtLike: {
      fontSize: FontSize.FontSize10,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    name: {
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width8,
    },
    viewInfo: {
      justifyContent: 'space-between',
      flex: 1,
    },
  });
