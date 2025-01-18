import { CookingIcon, DrinkIcon, GameHandleIcon, MarketIcon, MusicIcon, OutDoorIcon, ParachuteIcon, PhotographyIcon, PlatteIcon, RippleIcon, RunIcon, TennisIcon, VoteIcon, YogaIcon } from '@assets';
import { AppText } from '@components';
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
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'photography':
        return <PhotographyIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'shopping':
        return <MarketIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'karaoke':
        return <VoteIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'yoga':
        return <YogaIcon />;
      case 'cooking':
        return <CookingIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'tennis':
        return <TennisIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'run':
        return <RunIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'swimming':
        return <RippleIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'art':
        return <PlatteIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'traveling':
        return <OutDoorIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'extreme':
        return <ParachuteIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'music':
        return <MusicIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'drink':
        return <DrinkIcon color={isActive ? 'white' : themeColors.primary} />;
      case 'video_gamesgames':
        return <GameHandleIcon color={isActive ? 'white' : themeColors.primary} />;
      default:
        return <></>;
    }
  };
  return (
    <TouchableOpacity onPress={() => onSelect?.(id)} style={[styles.container, isActive && styles.active]}>
      {renderIcon(icon)}
      {/* <AppImage tintColor={isActive ? themeColors.whiteColor : undefined} source={renderIcon(icon)} style={{ width: Spacing.width24, height: Spacing.width24 }} /> */}
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
