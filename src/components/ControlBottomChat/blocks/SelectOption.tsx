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
  gameSelected?: ItemListProduct;
  isAll?: boolean;
  handleShowIconsAll?: () => void
}

export function SelectOption(props: SelectOptionProps) {
  const { onSticker, onGame, onImage, isShowGame, gameSelected, isAll, handleShowIconsAll } = props;
  return (
    <View style={styles.container}>
      {isAll ? <View style={styles.iconsContainer}>
        <TouchableOpacity
          disabled={isShowGame}
          onPress={onSticker}
          style={styles.iconButton}>
          <GlobalIcon color={isShowGame ? ColorsApp.disable : ColorsApp.colorMain4} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isShowGame}
          onPress={onImage}
          style={styles.iconButton}>
          <UploadImageIcon color={isShowGame ? ColorsApp.disable : ColorsApp.colorMain4} />
        </TouchableOpacity>
        {/* {!gameSelected && ( */}
        <TouchableOpacity
          disabled={!!gameSelected}
          hitSlop={
            { top: 10, bottom: 10, left: 10, right: 10 }
          } onPress={onGame} style={[styles.iconButton]}>
          <GameHandleIcon width={Spacing.width32} height={Spacing.width32} color={gameSelected ? ColorsApp.disable : ColorsApp.colorMain4} />
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
