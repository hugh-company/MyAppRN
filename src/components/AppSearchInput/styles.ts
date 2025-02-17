import {FontSize, FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: Spacing.width16,
    },
    btnCancel: {
      paddingVertical: Spacing.width12,
      paddingRight: Spacing.width16,
    },
    txtCancel: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    containerInput: {
      flex: 1,
    },
    input: {},
  });
