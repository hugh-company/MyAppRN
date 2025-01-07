import {FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    viewHeader: {},
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
    bottom: {
      height: Spacing.height40,
    },
  });
