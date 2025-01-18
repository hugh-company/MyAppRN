import { AppFlatListAnimated, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { UserItemInterface } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ItemUserDating } from './ItemUserDating';
export interface ListDatingItemProps {
  label?: string;
  data?: UserItemInterface[];
  total?: number
}

export function ListDatingItem(props: ListDatingItemProps) {
  const { label, data = [], total = 0 } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item, index }: { item: UserItemInterface, index?: number }) => {
    return (
      <ItemUserDating item={item} onPress={() => {
        navigate(SCREEN_ROUTE.DETAIL_USER, { user: item });
      }} />
    );
  };
  return <View style={styles.container}>
    <View style={styles.label}>
      <AppText style={styles.title}>{label}</AppText>
      <AppText style={[styles.total]}>{total}</AppText>
    </View>
    <AppFlatListAnimated
      data={data}
      numColumns={2}
      columnWrapperStyle={styles.list}
      renderItem={renderItem} />
  </View>;
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,

    },
    list: {
      gap: Spacing.width12,
      marginBottom: Spacing.width12,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      alignItems: 'center',

    },
    total: {
      color: themeColors.primary,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    label: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: Spacing.width16,
    },
  });
