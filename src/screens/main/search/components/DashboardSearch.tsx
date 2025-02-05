import { AppListDashboard, AppText } from '@components';
import { getSearchModuleLocal, setSearch } from '@redux';
import { getPostDashboardApi } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    const controller = new AbortController();
    callApiDashboard();
    return () => {
      controller.abort();
    };
  }, []);
  const callApiDashboard = async () => {
    try {
      const response = await getPostDashboardApi(ItemListDashboard.SEARCH);
      console.log({ response });
      dispatch(setSearch(response?.data?.modules || []));
    } catch (error) {
      // console.log({error});
    } finally {

    }
  };

  return (
    <View style={styles.container}>
      <MemoizedAppListDashboard
        data={dataSearch}
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        typeScreen={ItemListDashboard.SEARCH}
        key={'search_dashboard'}
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
