import { AppButtonViewMore, AppCategoryList, AppFlatListAnimated, ItemMovie } from '@components';
import { Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListProduct, ModuleItemInterface, PostTypeKey, TabInterface } from '@types';
import { goToDetail, goToListView } from '@utils';
import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
export interface CategoryListItemProps {
  data?: TabInterface[] | undefined;
  type?: PostTypeKey;
  itemModule?: ModuleItemInterface;
  goToViewList?: () => void;
  isTab?: boolean;
}

export function CategoryListItem(props: CategoryListItemProps) {
  const { data = [], type, goToViewList, isTab = true } = props;
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const [categoryIdSelected, setCategoryIdSelected] = React.useState(data[0]?.id);
  const refFlatList = React.useRef<FlatList<ItemListProduct>>(null);
  useEffect(() => {

    if (refFlatList.current) {
      refFlatList.current.scrollToOffset({ animated: false, offset: 0 });
    }
  }, [categoryIdSelected, refFlatList]);
  const onSelectedCategory = (category: TabInterface) => {
    setCategoryIdSelected(category.id);
  };
  const onClickDetail = (item: ItemListProduct) => {
    goToDetail({ item, type: type });
  };
  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return (
      <ItemMovie
        item={item}
        onPress={() => onClickDetail(item)}
        type={type} />
    );
  };


  return (
    <View style={styles.container}>
      <AppCategoryList
        data={data}
        categoryId={categoryIdSelected}
        goToViewList={goToViewList}
        isTab={isTab}

        onSelectedCategory={onSelectedCategory} />
      <AppFlatListAnimated
        ref={refFlatList}
        data={data.find((item) => item.id === categoryIdSelected)?.items || []}
        horizontal keyExtractor={(item) => `item_movie_${item.id}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListFooterComponent={<AppButtonViewMore onPress={() => {
          console.log('categoryIdSelected', data.find((item) => item.id === categoryIdSelected));
          const dataCategory = data?.find((item) => item.id === categoryIdSelected);
          goToListView({
            ...dataCategory?.button,
            keyCategory: dataCategory?.slug,
            label: '',
          });

        }} />}
        renderItem={renderItem} />
    </View>
  );
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
    contentContainerStyle: {
      paddingHorizontal: Spacing.width16,
      gap: Spacing.width16,
    },
    columnWrapperStyle: {

    },
    viewMore: {
      height: Spacing.width40,
      width: Spacing.width40,
      borderRadius: Spacing.width20,
      backgroundColor: themeColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
