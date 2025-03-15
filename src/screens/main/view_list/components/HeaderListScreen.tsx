import { IconFilter, SearchIcon } from '@assets';
import { AppCategoryList, AppHeader, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { KeyHomeData, PostTypeKey, TabInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface HeaderListScreenProps {
  title: string;

  onFilter?: () => void;
  onSelectedCategory?: (item: TabInterface) => void;
  activeCategory?: number;
  categories?: TabInterface[];
  type?: PostTypeKey;
  sort?: {
    key: string,
    value: string,
  }

}
export const HeaderListScreen = ({ title, onFilter, categories = [], onSelectedCategory, activeCategory = 0, type, sort }: HeaderListScreenProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const isCategory = categories?.length > 0;

  return (
    <View style={styles.container}>

      <AppHeader title={title}
        styleBack={{ backgroundColor: themeColors.transparent }}
        titleStyle={styles.titleHeader}
        rightComponent={
          <View style={styles.viewRow}>
            <TouchableOpacity
              onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, { type: KeyHomeData.MOVIES })}
              style={[styles.btnSearchCategory, !isCategory && styles.btnSearch]}>
              <SearchIcon size={Spacing.width24} />
            </TouchableOpacity>
          </View>

        } />

      <AppCategoryList
        data={categories}
        categoryId={activeCategory}
        onSelectedCategory={(item) => onSelectedCategory?.(item)}
        listStyle={styles.listCategory} />

      <View style={styles.viewFilter}>
        <AppText style={styles.valueFilter}>{sort?.value}</AppText>

        <TouchableOpacity style={styles.btnFilter} activeOpacity={1} onPress={onFilter}>
          <IconFilter size={Spacing.width24} />
          <AppText style={styles.txtFilter}>{t('filter_1')}</AppText>

        </TouchableOpacity>
      </View>
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

    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: FontSize.FontSize24,
    ...FontWithFamily.FontWithFamily_600,
    textAlign: 'center',
    flex: 1,

    paddingRight: Spacing.width16,
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
  viewFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.width16,
    paddingHorizontal: Spacing.width16,
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    justifyContent: 'center',
  },
  txtFilter: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  valueFilter: {
    fontSize: FontSize.FontSize20,
    ...FontWithFamily.FontWithFamily_600,
    flex: 1,
    paddingRight: Spacing.width16,
  },
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
    paddingLeft: Spacing.width8,
    marginVertical: 0,
    marginTop: Spacing.width8,
  },
});
