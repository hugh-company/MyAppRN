import { NoSearchImage } from '@assets';
import { AppFlatListAnimated, AppImage, AppText, ItemSearchMovie } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SearchListProps {
  data: any[],
  valueSearch?: string
}

export const SearchList = ({ data, valueSearch }: SearchListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const renderItem = ({ item }) => <ItemSearchMovie item={item} />;
  const renderEmpty = () => (
    <View style={styles.empty}>
      <AppImage defaultSource={NoSearchImage} style={styles.imageNotFound} />
      <AppText style={styles.txtEmpty}>{t('search.searchNotFound')}</AppText>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppFlatListAnimated
        ListHeaderComponent={valueSearch ? <AppText style={styles.title}>{t('search.searchResults').replace('NAME', valueSearch)}</AppText> : null}
        data={data}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
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
      backgroundColor: themeColors.background,
    },
    list: {
      marginHorizontal: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width18,
    },
    imageNotFound: {
      width: Spacing.width200,
      height: Spacing.width100,
    },
    empty: {
      paddingVertical: Spacing.height42,
      alignItems: 'center',
      gap: Spacing.width16,
    },
    txtEmpty: {
      color: themeColors.subtile,
    },
  });
