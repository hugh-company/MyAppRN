import {ColorsApp, FontSize, FontWithFamily, Spacing} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.background,
  },
  title: {
    fontSize: FontSize.FontSize24,
    ...FontWithFamily.FontWithFamily_600,
    color: ColorsApp.text,
  },
  select: {
    fontSize: FontSize.FontSize16,
    color: ColorsApp.primary,
    ...FontWithFamily.FontWithFamily_600,
  },
  search: {
    paddingTop: 0,
    marginBottom: Spacing.width16,
    paddingHorizontal: 0,
  },
  gigabyte: {},
  category: {
    marginVertical: Spacing.width16,
  },
  list: {},
  contentContainerStyle: {
    padding: 0,
    paddingHorizontal: Spacing.width16,

    gap: Spacing.width8,
    flexGrow: 1,
  },
  bottom: {
    height: Spacing.width100,
  },
  columnWrapperStyle: {
    gap: Spacing.width8,
    // justifyContent: 'space-between',
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    padding: Spacing.width16,
    borderTopWidth: 1,
    borderTopColor: ColorsApp.border,
    backgroundColor: ColorsApp.background,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    height: Spacing.width42,
  },
  btnSelect: {
    borderColor: ColorsApp.btnSocial,
    borderWidth: 1,
    backgroundColor: ColorsApp.inputBackground,
    width: Spacing.width24,
    height: Spacing.width24,
    borderRadius: Spacing.width12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSelectActive: {
    borderWidth: 0,
    backgroundColor: ColorsApp.primary,
    width: Spacing.width24,
    height: Spacing.width24,
    borderRadius: Spacing.width12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.width16,
    gap: Spacing.width8,
  },
  btnDelete: {
    width: Spacing.width100,
    height: Spacing.width42,
    borderRadius: Spacing.width42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.primary,
  },
  btnDeleteDisable: {
    width: Spacing.width100,
    height: Spacing.width42,
    borderRadius: Spacing.width42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.btnSocial,
  },
  txtDelete: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    color: ColorsApp.whiteColor,
  },
  txtDeleteDisable: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    color: ColorsApp.disable,
  },
  btnUnSelect: {
    width: Spacing.width100,
    height: Spacing.width42,
    borderRadius: Spacing.width42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.btnSocial,
  },
  txtUnSelect: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    color: ColorsApp.onSurface,
  },
});
