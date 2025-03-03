import { FilterIcon, SearchIcon } from '@assets';
import { AppCategoryList, AppHeader, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { KeyHomeData, PostTypeKey, TabInterface } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface HeaderListScreenProps {
  title: string;

  onFilter?: () => void;
  onSelectedCategory?: (item: TabInterface) => void;
  activeCategory?: number;
  categories?: TabInterface[];
  type?: PostTypeKey;

}
export const HeaderListScreen = ({ title, onFilter, categories = [], onSelectedCategory, activeCategory = 0, type }: HeaderListScreenProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const isCategory = categories?.length > 0;

  return (
    <View style={styles.container}>
      <AppHeader title={isCategory ? title : ''} rightComponent={
        <View style={styles.viewRow}>
          <TouchableOpacity
            onPress={() => onFilter?.()}
            style={[styles.btnSearchCategory, !isCategory && styles.btnSearch]}>
            <FilterIcon size={Spacing.width28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: KeyHomeData.MOVIES })}
            style={[styles.btnSearchCategory, !isCategory && styles.btnSearch]}>
            <SearchIcon size={Spacing.width24} />
          </TouchableOpacity>
        </View>

      } />
      {(isCategory && type === PostTypeKey.MOVIES) && <>
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
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
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
