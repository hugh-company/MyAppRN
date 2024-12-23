import { AppFlatListAnimated, AppText, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DashboardSearchProps {
  data: any[]
}

export const DashboardSearch = ({ data }: DashboardSearchProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const renderItem = ({ item }) => (
    <HorizontalList
      style={styles.item}
      itemStyle={styles.itemImage}
      title={item.name}
      type={item.type}
      data={item.data?.map(elm => ({
        ...elm,
        image: elm?.poster,
      }))}
      titleViewMore={t('home.viewAll')}
      onViewMore={() => {
        navigate(SCREEN_ROUTE.LIST_MOVIES, { type: item.type, name: item.name, id: item.id });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <AppFlatListAnimated
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        data={data}
        renderItem={renderItem}
        onRefresh={() => { }}
      />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width18,
      marginHorizontal: Spacing.width16,
    },
    itemImage: {
      width: Spacing.width120,
    },
    item: {
      marginTop: Spacing.width16,
      marginBottom: 0,
    },
  });
