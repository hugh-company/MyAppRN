import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.width16,
  },
  body: {},
  title: {
    ...FontWithFamily.FontWithFamily_600,
    fontSize: FontSize.FontSize18,
    color: Colors.primary,
    marginVertical: Spacing.height24,
  },
  button: {
    marginTop: Spacing.height72,
  },
});
