import { AppHeader, AppImage, AppText } from '@components';
import { usePremiumUsers } from '@hooks';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, Spacing } from '@theme';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export function ViewAllPremiumScreen() {
  const { data: list = [], isLoading } = usePremiumUsers();

  if (isLoading) {
    return <AppText>Loading...</AppText>;
  }

  const renderItem = ({ item }: { item: any }) => (
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
      <AppHeader title="Premium Account" />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ gap: Spacing.width16, padding: Spacing.width16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    marginBottom: Spacing.width16,
  },
  avatar: {
    width: Spacing.width50,
    height: Spacing.width50,
    borderRadius: Spacing.width25,
  },
  txt: {
    fontSize: FontSize.FontSize14,
  },
  title: {
    fontSize: FontSize.FontSize18,
    fontWeight: 'bold',
    marginBottom: Spacing.width16,
  },
});
