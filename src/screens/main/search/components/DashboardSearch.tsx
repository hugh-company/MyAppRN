import { AppListDashboard, AppText } from '@components';
import { getSearchModuleLocal } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface DashboardSearchProps {

}
const MemoizedAppListDashboard = React.memo(AppListDashboard);

const DashboardSearch = ({ }: DashboardSearchProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const dataSearch = useSelector(getSearchModuleLocal);




  return (
    <View style={styles.container}>
      <MemoizedAppListDashboard
        data={dataSearch}
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        typeScreen={ItemListDashboard.SEARCH}
        key={'search_dashboard'}
        loading={false}
        keyExtractor={(item, index) => `search_dashboard_${index}`}
      />
    </View>
  );
};

export default DashboardSearch;

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width18,
      marginHorizontal: Spacing.width16,
    },
    itemImage: {
      width: Spacing.width120,
    },
    item: {
      marginTop: Spacing.width16,
      marginBottom: 0,
    },
  });
