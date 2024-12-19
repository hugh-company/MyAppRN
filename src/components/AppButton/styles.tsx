import { FontSize, FontWithFamily, Spacing } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    minHeight: Spacing.height48,
    flexDirection: 'row',
    borderRadius: Spacing.width84,
  },
  label: {
    textAlign: 'center',
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    flex: 1,
  },
  icon: {
    marginLeft: Spacing.width20,
  },
  txtWrap: { flex: 0, paddingHorizontal: Spacing.width15 },
});
