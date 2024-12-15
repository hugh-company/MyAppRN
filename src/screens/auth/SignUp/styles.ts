import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.width16,
  },
  title: {
    ...FontWithFamily.FontWithFamily_600,
    fontSize: FontSize.FontSize18,
    color: Colors.primary,
    marginTop: Spacing.height24,
  },
  description: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize12,
    color: Colors.black,
    marginTop: Spacing.height8,
  },
  inputPhone: {
    marginTop: Spacing.height16,
  },
  txtAccept: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize10,
    color: Colors.black,
  },
  txtAcceptLink: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize10,
    color: Colors.link,
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
  button: {
    marginTop: Spacing.height72,
  },
});
