import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { RootState } from '@redux';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import { UserItemInterface } from '@types';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
export interface ListUserOnlineProps { }

export function UsersGoldList(props: ListUserOnlineProps) {
  const list = useSelector((state: RootState) => state.dataLocalSlide.userPremium);
  const { } = props;
  console.log({ list });

  const renderItem = ({ item }: { item: UserItemInterface }) => (
    <TouchableOpacity onPress={() => {
      navigate(SCREEN_ROUTE.DETAIL_USER, { user: item });
    }} style={styles.userContainer}>
      <AppImage uri={item.avatar} style={styles.avatar} />
      <AppText numberOfLines={1} style={styles.txt}>
        {item.fullname}
      </AppText>
    </TouchableOpacity>
  );

  if (list.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Premium Account
      </AppText>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: Spacing.width16 }}
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
    maxWidth: Spacing.width80,
    alignItems: 'center',

  },
  avatar: {
    width: Spacing.width50,
    height: Spacing.width50,
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
  txt: {
    fontSize: FontSize.FontSize12,
    textAlign: 'center',
  },
  title: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    marginBottom: Spacing.width16,

  },
});
