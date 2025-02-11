import { AppImage } from '@components';
import { Spacing } from '@theme';
import { ItemListProduct, PostTypeKey } from '@types';
import { goToDetail } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
export interface MessageGameProps {
  list: ItemListProduct[];

}

export function MessageGame(props: MessageGameProps) {
  const { list } = props;
  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return (
      <TouchableOpacity onPress={() => {
        goToDetail({ item, type: PostTypeKey.GAMES });
      }}>
        <AppImage uri={item.banner.path} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return <View>
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={list.length > 1} // if one item, don't show scroll
      style={styles.list}
    />
  </View>;
}
const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  image: {
    width: Spacing.width150,
    height: Spacing.width150,
    borderRadius: 10,
  },
});
