import { FontSize, FontWithFamily, Spacing } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    minHeight: Spacing.height40,
    flexDirection: 'row',
    borderRadius: Spacing.width8,
    overflow: 'hidden', // Prevent content overflow

  },
  btnLinear: {
    borderRadius: Spacing.width8,
    ...StyleSheet.absoluteFillObject
  },
  label: {
    textAlign: 'center',
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
    flex: 1,
  },
  icon: {
    marginLeft: Spacing.width20,
  },
  txtWrap: { flex: 0, paddingHorizontal: Spacing.width15 },
  touchable: {
    borderRadius: Spacing.width8, // Match the button's border radius
    overflow: 'hidden', // Prevent content overflow
  },
});
