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
  description: {
    marginTop: Spacing.width8,
  },
  body: {
    marginHorizontal: Spacing.width16,
  },
  avatar: {
    width: Spacing.width99,
    height: Spacing.width99,
    borderRadius: Spacing.width25,
  },
  btnAvatar: {
    marginVertical: Spacing.height48,
  },
  btn: {
    alignSelf: 'flex-end',
    width: Spacing.width132,
  },
  bottom: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Spacing.width32,
    paddingTop: Spacing.width16,
    marginHorizontal: Spacing.width16,
  },
});
