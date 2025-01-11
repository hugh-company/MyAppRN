import { ImageBook, ImageGame, ImageMovie } from '@assets';
import { AppImage } from '@components';
import { Spacing } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface HeaderDrawerProps { }

export function HeaderDrawer(props: HeaderDrawerProps) {
  const { } = props;
  return <View style={[styles.viewImage, {}]}>
    {[ImageBook, ImageGame, ImageMovie].map((item, index) => (
      <View key={index}>
        <AppImage key={index.toString()} resizeMode={'stretch'} style={styles.image} defaultSource={item} />
      </View>
    ))}
  </View>;
}
const styles = StyleSheet.create({
  viewImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: Spacing.width32,
  },
  image: {
    width: Spacing.width60,
    height: Spacing.width60,
  },
});
