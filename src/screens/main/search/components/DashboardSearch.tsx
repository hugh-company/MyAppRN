import { AppListDashboard, AppText } from '@components';
import { getSearchModuleLocal } from '@redux';
import { getPostDashboardApi } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface DashboardSearchProps {

}

const DashboardSearch = ({ }: DashboardSearchProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const dataSearch = useSelector(getSearchModuleLocal);
  useEffect(() => {
    callApiDashboard();
  }, []);
  const callApiDashboard = async () => {
    try {
      const response = await getPostDashboardApi(ItemListDashboard.SEARCH);
      console.log({ response });

      // dispatch(setSearch(response?.data?.modules || []));
    } catch (error) {
      // console.log({error});

    }
  };
  return (
    <View style={styles.container}>
      <AppListDashboard
        data={dataSearch}
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        typeScreen={ItemListDashboard.SEARCH}
      />
    </View>
  );
};

export default memo(DashboardSearch);

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
