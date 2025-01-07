import { AppCategoryList, AppFlatListAnimated, ItemMovie } from '@components';
import { ThemeColors, useTheme } from '@theme';
import { ItemListProduct, ModuleItemInterface, PostTypeKey } from '@types';
import { goToDetail } from '@utils';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
export interface CategoryListItemProps {
  data?: ModuleItemInterface[]
  type?: PostTypeKey
}

export function CategoryListItem(props: CategoryListItemProps) {
  const { data = [], type } = props;
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const [categoryIdSelected, setCategoryIdSelected] = React.useState(data[0]?.id);
  const onSelectedCategory = (categoryId: number) => {
    setCategoryIdSelected(categoryId);
  };
  const onClickDetail = (item) => {
    goToDetail({ item, type: type });
  };
  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return (
      <ItemMovie item={item} onPress={() => onClickDetail(item)} />
    );
  };

  return <View style={styles.container}>
    <AppCategoryList data={data} categoryId={categoryIdSelected} onSelectedCategory={onSelectedCategory} />
    <AppFlatListAnimated
      data={data.find((item) => item.id === categoryIdSelected)?.items}
      horizontal keyExtractor={(item) => `item_movie_${item.id}`}
      renderItem={renderItem} />
  </View>;
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
  });
