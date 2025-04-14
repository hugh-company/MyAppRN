import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { getListUserOnline } from '@redux';
import { ColorsApp, Spacing } from '@theme';
import { OtherUser } from '@types';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
export interface ListUserOnlineProps { }

export function ListUserOnline(props: ListUserOnlineProps) {
  const list = useSelector(getListUserOnline);
  const { } = props;
  console.log({ list });

  const renderItem = ({ item }: { item: OtherUser }) => (
    <TouchableOpacity onPress={() => {
      navigate(SCREEN_ROUTE.DETAIL_USER, { user: item });
    }} style={styles.userContainer}>
      <AppImage uri={item.avatar} style={styles.avatar} />
      <View style={styles.status} />
      <AppText style={styles.txtName} numberOfLines={1}>{item?.fullname}</AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Spacing.width16, gap: Spacing.width16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.width8,
  },
  userContainer: {
    gap: Spacing.width8,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Spacing.width80,
  },
  avatar: {
    width: Spacing.width48,
    height: Spacing.width48,
    borderRadius: Spacing.width30,

  },
  txtName: {
    fontSize: Spacing.width12,
    color: ColorsApp.whiteColor,
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
