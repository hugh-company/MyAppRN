import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.width16,
  },
  btnErrorPhone: {
    marginTop: Spacing.height16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.width100,

    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  txtBtnErrorPhone: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize12,
    color: Colors.black,
  },
});
