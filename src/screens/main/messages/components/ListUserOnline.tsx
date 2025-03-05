import { AppImage } from '@components';
import { getListUserOnline } from '@redux';
import { ColorsApp, Spacing } from '@theme';
import { OtherUser } from '@types';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
export interface ListUserOnlineProps { }

export function ListUserOnline(props: ListUserOnlineProps) {
  const list = useSelector(getListUserOnline);
  const { } = props;
  console.log({ list });

  const renderItem = ({ item }: { item: OtherUser }) => (
    <View style={styles.userContainer}>
      <AppImage uri={item.avatar} style={styles.avatar} />
      <View style={styles.status} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Spacing.width16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.width8,
  },
  userContainer: {

  },
  avatar: {
    width: Spacing.width60,
    height: Spacing.width60,
    borderRadius: Spacing.width30,

  },
  status: {
    width: Spacing.width15,
    height: Spacing.width15,
    borderRadius: Spacing.width15,
    backgroundColor: ColorsApp.active,
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 3,
    borderColor: ColorsApp.whiteColor,
  },
});
