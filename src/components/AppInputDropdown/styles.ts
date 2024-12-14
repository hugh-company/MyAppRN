import {Colors, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.height16,
  },
  label: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,

    marginBottom: Spacing.height8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: Spacing.height44,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.width12,
    fontSize: FontSize.FontSize14,
    color: Colors.text,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  txtInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPlaceholder: {
    color: Colors.placeholder,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height4,
  },
  //
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.height8,
    flex: 1,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.width12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.height12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.text,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
