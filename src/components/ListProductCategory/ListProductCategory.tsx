import { HeaderItemHome, ItemMovie } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { useTheme } from '@theme';
import { ItemListProduct, KeyHomeData, TypeList } from '@types';
import { goToDetail } from '@utils';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface ListProductCategoryProps {
  title?: string;
  // data?: ItemListProduct[];
  categories?: any[];
  onSelectedCategory?: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  type?: KeyHomeData;
  reset?: boolean;
}
const ListProductCategory = ({ title, categories = [], reset, style, type }: ListProductCategoryProps) => {
  const [activeCategory, setActiveCategory] = React.useState(categories[0]?.id);
  const { themeColors } = useTheme();

  const styles = createStyles(themeColors);
  useEffect(() => {
    if (reset) {
      setActiveCategory(categories[0]?.id);
    }
  }, [reset]);
  const onClickDetail = (item) => {
    goToDetail({ item, type });
  };
  const gotoViewListWithCategory = (id: number) => {
    navigate(SCREEN_ROUTE.VIEW_LIST, {
      name: t('view_list.titleCategory'),
      type,
      typeList: TypeList.CATEGORY,
      categories: categories,
      categoryIdSelected: id,
    });
  };
  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return (
      <ItemMovie item={item} onPress={() => onClickDetail(item)} />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <HeaderItemHome
        title={title}
        categoryIdSelected={activeCategory}
        categories={categories}
        onSelectedCategory={(value) => {
          // onSelectedCategory && onSelectedCategory(activeCategory);
          setActiveCategory(value);
          // if (activeCategory !== value) {
          //   gotoViewListWithCategory(activeCategory);
          // }
        }} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories.find((item) => item.id === activeCategory)?.items}
        horizontal keyExtractor={(item) => `item_movie_${item.id}`}
        renderItem={renderItem} />
    </View>
  );
};

export default ListProductCategory;
