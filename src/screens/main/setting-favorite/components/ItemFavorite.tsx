import { AppText } from '@components';
import { Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
interface ItemFavoriteProps {
  item: {
    id: number;
    Icon?: any;
    name: string;
  };
  listSelected: number[];
  onSelect?: (id: number) => void;
}
export const ItemFavorite = ({ item, listSelected, onSelect }: ItemFavoriteProps) => {
  const { Icon, name, id } = item;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const isActive = useMemo(() => listSelected.includes(item.id), [listSelected, item.id]);
  return (
    <TouchableOpacity onPress={() => onSelect?.(id)} style={[styles.container, isActive && styles.active]}>
      {Icon && <Icon color={isActive ? themeColors.text : themeColors.primary} />}
      <AppText>{name}</AppText>
    </TouchableOpacity>
  );
};
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
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
