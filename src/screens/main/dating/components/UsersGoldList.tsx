import { EyeIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { usePremiumUsers } from '@hooks';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import { UserItemInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ListUserOnlineProps { }

export function UsersGoldList(props: ListUserOnlineProps) {
  const { data: list = [], isLoading } = usePremiumUsers();
  const { } = props;

  if (isLoading || list.length === 0) {
    return null;
  }

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

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Premium Account
      </AppText>
      <FlatList
        data={list.slice(0, 5)} // Show only the first 5 users
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: Spacing.width16 }}
        ListFooterComponent={<TouchableOpacity style={[styles.userContainer]} onPress={() => {
          navigate(SCREEN_ROUTE.VIEW_ALL_PREMIUM);
        }}>
          <View style={styles.viewIconSizeSmall}>
            <EyeIcon color={'white'} />
          </View>
          <AppText style={styles.txt}>{t('home.viewMore')} </AppText>
        </TouchableOpacity>}
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

  viewIconSizeSmall: {
    width: Spacing.width60,
    height: Spacing.width60,
    borderRadius: Spacing.width30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.primary,

  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    marginLeft: Spacing.width8,
    paddingVertical: Spacing.width8,
    paddingHorizontal: Spacing.width16,
    borderRadius: Spacing.width30,
    backgroundColor: ColorsApp.primary,
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
  txt: {
    fontSize: FontSize.FontSize12,
    textAlign: 'center',
  },
  title: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
    marginBottom: Spacing.width16,

  },
  viewAllText: {
    fontSize: FontSize.FontSize14,
    color: ColorsApp.primary,
    textAlign: 'center',
    marginTop: Spacing.width8,
  },
});
