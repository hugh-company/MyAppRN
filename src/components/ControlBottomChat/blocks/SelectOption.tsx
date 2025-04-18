import { GameHandleIcon, GlobalIcon, RightIcon, UploadImageIcon } from '@assets';
import { ColorsApp, Spacing } from '@theme';
import { ItemListProduct } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface SelectOptionProps {
  onSticker: () => void;
  onGame: () => void;
  onImage: () => void;
  isShowGame: boolean;
  isStiker: boolean;
  gameSelected?: ItemListProduct;
  hasSticker?: boolean;
  isAll?: boolean;
  handleShowIconsAll?: () => void
}

export function SelectOption(props: SelectOptionProps) {
  const {
    onSticker,
    onGame,
    onImage,
    isShowGame,
    isStiker,
    gameSelected,
    hasSticker,
    isAll,
    handleShowIconsAll,
  } = props;

  return (
    <View style={styles.container}>
      {isAll ? <View style={styles.iconsContainer}>
        <TouchableOpacity
          disabled={!isStiker} // Sticker button is disabled if not in sticker mode
          onPress={onSticker}
          style={styles.iconButton}>
          <GlobalIcon color={!isStiker ? ColorsApp.disable : ColorsApp.colorMain4} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isShowGame || hasSticker} // Image button is disabled if game or sticker is selected
          onPress={onImage}
          style={styles.iconButton}>
          <UploadImageIcon color={(isShowGame || hasSticker) ? ColorsApp.disable : ColorsApp.colorMain4} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!!gameSelected || hasSticker} // Game button is disabled if game is already selected or sticker is selected
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={onGame}
          style={[styles.iconButton]}>
          <GameHandleIcon
            width={Spacing.width32}
            height={Spacing.width32}
            color={(gameSelected || hasSticker) ? ColorsApp.disable : ColorsApp.colorMain4}
          />
        </TouchableOpacity>
      </View> : <TouchableOpacity onPress={handleShowIconsAll} style={[styles.iconButton, { width: Spacing.width30 }]}>
        <RightIcon />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Spacing.width30,
  },
  iconButton: {
    width: Spacing.width40,
    height: Spacing.width30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
