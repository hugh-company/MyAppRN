import { AppText } from '@components';
import { useTheme } from '@theme';
import React, { memo, useCallback, useRef } from 'react';
import { FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';

export interface AppCategoryListProps {
  data: { id: number, name: string }[];
  categoryId: number;
  onSelectedCategory: (categoryId: number) => void;
  style?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  type?: 'list' | 'tab'
}

const CategoryItem = memo(({ item, index, categoryId, handleCategoryPress, styles }: any) => (
  <TouchableOpacity onPress={() => handleCategoryPress(item.id, index)} style={[styles.itemCategory, categoryId === item.id && styles.btnActiveCategory]}>
    <AppText style={[styles.txtCategory, categoryId === item.id && styles.txtActiveCategory]}>
      {item.name}
    </AppText>
  </TouchableOpacity>
));

const AppCategoryList = ({ data, categoryId, onSelectedCategory, style, listStyle }: AppCategoryListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);

  const handleCategoryPress = useCallback((id: number, index: number) => {
    onSelectedCategory(id);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }, [onSelectedCategory]);

  const renderItem = useCallback(({ item, index }) => (
    <CategoryItem item={item} index={index} categoryId={categoryId} handleCategoryPress={handleCategoryPress} styles={styles} />
  ), [categoryId, handleCategoryPress, styles]);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        style={[styles.viewCategory, listStyle]}
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default memo(AppCategoryList);
