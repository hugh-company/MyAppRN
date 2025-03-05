import {
  FontSize,
  FontWithFamily,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: Spacing.width16,
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
    list: {},
    item: {
      flex: 1,
      justifyContent: 'space-between',
      maxWidth: (WidthScreen - Spacing.width48) / 2,
    },
    columnWrapper: {
      gap: Spacing.width16,
      marginBottom: Spacing.width16,
    },
    image: {
      height: Spacing.width220,
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
