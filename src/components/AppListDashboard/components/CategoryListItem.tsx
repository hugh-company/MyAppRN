import { AppCategoryList, AppFlatListAnimated, ItemMovie } from '@components';
import { ThemeColors, useTheme } from '@theme';
import { ItemListProduct, ModuleItemInterface, PostTypeKey, TabInterface } from '@types';
import { goToDetail } from '@utils';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
export interface CategoryListItemProps {
  data?: TabInterface[] | undefined;
  type?: PostTypeKey
  itemModule?: ModuleItemInterface;
  goToViewList?: () => void;
  isTab?: boolean;
}

export function CategoryListItem(props: CategoryListItemProps) {
  const { data = [], type, goToViewList, isTab = true } = props;
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const [categoryIdSelected, setCategoryIdSelected] = React.useState(data[0]?.id);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const onSelectedCategory = (category: TabInterface) => {
    setCategoryIdSelected(category.id);
  };
  const onClickDetail = (item: ItemListProduct) => {
    goToDetail({ item, type: type });
  };
  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return (
      <ItemMovie item={item} onPress={() => onClickDetail(item)} />
    );
  };

  if (!isLoaded) {
    return <></>;
  }

  return <View style={styles.container}>
    <AppCategoryList
      data={data}
      categoryId={categoryIdSelected}
      goToViewList={goToViewList}
      isTab={isTab}
      onSelectedCategory={onSelectedCategory} />
    <AppFlatListAnimated
      data={data.find((item) => item.id === categoryIdSelected)?.items || []}
      horizontal keyExtractor={(item) => `item_movie_${item.id}`}
      renderItem={renderItem} />
  </View>;
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
  });
