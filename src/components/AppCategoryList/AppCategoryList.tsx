import { AppText } from '@components';
import { useTheme } from '@theme';
import React, { useRef } from 'react';
import { FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppCategoryListProps {
  data: { id: number, name: string }[];
  categoryId: number;
  onSelectedCategory: (categoryId: number) => void;

  style?: StyleProp<ViewStyle>
  listStyle?: StyleProp<ViewStyle>
}
const AppCategoryList = ({ data, categoryId, onSelectedCategory, style, listStyle }: AppCategoryListProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);

  const handleCategoryPress = (id: number, index: number) => {
    onSelectedCategory(id);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        style={[styles.viewCategory, listStyle]}
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => handleCategoryPress(item.id, index)} style={[styles.itemCategory, categoryId === item.id && styles.btnActiveCategory]} >
              <AppText style={[styles.txtCategory, categoryId === item.id && styles.txtActiveCategory]}>
                {item.name}
              </AppText>
            </TouchableOpacity>
          );
        }}
      />
    </View>

  );
};

export default AppCategoryList;
