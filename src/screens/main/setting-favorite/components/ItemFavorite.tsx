import { AppImage, AppText } from '@components';
import { Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
interface ItemFavoriteProps {
  item: {
    id: number;
    icon?: string;
    name: string;
  };
  listSelected: number[];
  onSelect?: (id: number) => void;
}
export const ItemFavorite = ({ item, listSelected, onSelect }: ItemFavoriteProps) => {
  const { icon, name, id } = item;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const isActive = useMemo(() => listSelected?.includes(item?.id), [listSelected, item.id]);
  return (
    <TouchableOpacity onPress={() => onSelect?.(id)} style={[styles.container, isActive && styles.active]}>
      <AppImage tintColor={isActive ? themeColors.whiteColor : undefined} uri={icon} style={{ width: Spacing.width24, height: Spacing.width24 }} />
      <AppText>{name}</AppText>
    </TouchableOpacity>
  );
};
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
    width: (WidthScreen - Spacing.width48) / 2,
    borderRadius: Spacing.width12,
    paddingHorizontal: Spacing.width16,
    backgroundColor: themeColors.btnSocial,
    height: Spacing.width52,
    marginBottom: Spacing.width16,
    gap: Spacing.width16,
  },
  active: {
    backgroundColor: themeColors.primary,
  },

});
