import { SearchIcon } from '@assets';
import { AppCategoryList, AppHeader, AppInputSearch, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { KeyHomeData, PostTypeKey, TabInterface } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface HeaderListScreenProps {
  title: string;
  search?: string;
  onSearch?: (text: string) => void;
  onSelectedCategory?: (item: TabInterface) => void;
  activeCategory?: number;
  scrollY: SharedValue<number>;
  categories?: TabInterface[];
  type?: PostTypeKey;

}
export const HeaderListScreen = ({ title, search, onSearch, categories = [], scrollY, onSelectedCategory, activeCategory = 0, type }: HeaderListScreenProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: scrollY.value > 50 ? 0 : 50,
    };
  });
  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 50 ? 0 : 1,
    };
  });
  const isCategory = categories?.length > 0;

  return (
    <View style={styles.container}>
      <AppHeader title={isCategory ? title : ''} rightComponent={
        <TouchableOpacity
          onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: KeyHomeData.MOVIES })}
          style={[styles.btnSearchCategory, !isCategory && styles.btnSearch]}>
          <SearchIcon size={Spacing.width24} />
        </TouchableOpacity>} />
      {(isCategory && type === PostTypeKey.MOVIES) && <>
        <Animated.View style={[styles.inputSearch, heightStyle, opacityStyle]}>
          <AppInputSearch
            value={search}
            onChangeText={(text) => {
              onSearch?.(text);
            }}
          />
        </Animated.View>
        <AppCategoryList
          data={categories}
          categoryId={activeCategory}
          onSelectedCategory={(item) => onSelectedCategory?.(item)}
          listStyle={styles.listCategory} />
      </>}


      {!isCategory && <AppText style={styles.title}>{title}</AppText>}

      {(type === PostTypeKey.COMIC && isCategory) && <>
        <AppCategoryList
          data={categories}
          categoryId={activeCategory}
          onSelectedCategory={(item) => onSelectedCategory?.(item)}
          listStyle={styles.listCategory} />
      </>}


    </View>
  );
};
const createStyles = (themeColors: any) => StyleSheet.create({
  container: {

  },
  btnSearch: {
    width: Spacing.width40,
    height: Spacing.width40,
    borderRadius: Spacing.height24,
    backgroundColor: themeColors.btnSocial,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.FontSize24,
    ...FontWithFamily.FontWithFamily_600,
    marginHorizontal: Spacing.width16,
    marginVertical: Spacing.width16,
  },
  categoryList: {

  },
  itemCategory: {

  },
  activeCategory: {},
  btnSearchCategory: {
    width: Spacing.width40,
    height: Spacing.width40,

    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSearch: {
    paddingHorizontal: Spacing.width16,

  },
  listCategory: {
    paddingLeft: Spacing.width16,
  },
});
