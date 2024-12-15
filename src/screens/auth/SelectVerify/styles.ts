import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.width16,
  },
  btnVerify: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.width16,
    paddingVertical: Spacing.height12,
    borderRadius: Spacing.width8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.height16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtVerify: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize14,
    color: Colors.black,
  },
  infoVerify: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width12,
  },
  imgZalo: {
    width: Spacing.width24,
    height: Spacing.width24,
  },
  containerBtn: {
    marginTop: Spacing.height16,
  },
});
