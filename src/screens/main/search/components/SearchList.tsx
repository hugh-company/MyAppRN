import { AppListMovies } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListProduct } from '@types';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface SearchListProps {
  data: ItemListProduct[],
  valueSearch?: string,
  onLoadMore: () => void,
}

const SearchList = ({ data, valueSearch, onLoadMore }: SearchListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppListMovies
        numColumns={2}
        scrollEventThrottle={16}
        data={data}
        keyExtractor={(item, index) => `search_list_${item?.id || index}`}
        onLoadMore={onLoadMore}
      />
    </View>
  );
};

export default memo(SearchList);

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
