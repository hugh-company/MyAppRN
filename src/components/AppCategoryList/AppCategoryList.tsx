import { AppText } from '@components';
import { useTheme } from '@theme';
import { TabInterface } from '@types';
import { goToListView } from '@utils';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';

export interface AppCategoryListProps {
  data: TabInterface[] | undefined;
  categoryId?: number;
  onSelectedCategory: (item: TabInterface) => void;
  style?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;

  title?: string;
  isTab?: boolean;
  goToViewList?: (item: TabInterface) => void;
}

const CategoryItem = memo(({ item, index, categoryId, handleCategoryPress, styles }: any) => (
  <TouchableOpacity onPress={() => handleCategoryPress(item.id, index)} style={[styles.itemCategory, categoryId === item.id && styles.btnActiveCategory]}>
    <AppText style={[styles.txtCategory, categoryId === item.id && styles.txtActiveCategory]}>
      {item.name}
    </AppText>
  </TouchableOpacity>
));

const AppCategoryList = ({ data, categoryId, onSelectedCategory, isTab = true, style, listStyle, goToViewList }: AppCategoryListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryPress = useCallback((item: TabInterface, index: number) => {

    if (isTab) {
      onSelectedCategory(item);
      flatListRef.current?.scrollToIndex({ index, animated: true });

    } else {
      goToListView({
        ...item.button,
        keyCategory: item?.slug,

      });
    }
  }, [onSelectedCategory, goToViewList]);

  const renderItem = useCallback(({ item, index }: any) => (
    <CategoryItem
      item={item}
      index={index}
      categoryId={categoryId}
      handleCategoryPress={() => handleCategoryPress(item, index)}
      styles={styles} />
  ), [categoryId, handleCategoryPress, styles]);

  if (!isLoaded) {
    return <></>;
  }

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
