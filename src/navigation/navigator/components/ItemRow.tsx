import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
interface ItemRowProps {
  linkImage: string
  title: string;
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  size?: number;
}
export const ItemRow = ({ linkImage, title, onPress, styles, labelStyle, size }: ItemRowProps) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styleItem.itemRow, styles]}>
      <AppImage uri={linkImage} style={{ width: size, height: size }} />
      <AppText style={[styleItem.txtItem, labelStyle]}>{title}</AppText>
    </TouchableOpacity>
  );

};
const styleItem = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: Spacing.width8,
    gap: Spacing.width16,
    height: Spacing.width40,
  },
  txtItem: {
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_400,
    color: '#EDEDED',
  },
});
