import { AppListDashboard, AppText } from '@components';
import { getPostDashboardApi } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface DashboardSearchProps {

}

const DashboardSearch = ({ }: DashboardSearchProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    callApiDashboard();
  }, []);
  const callApiDashboard = async () => {
    try {
      const response = await getPostDashboardApi(ItemListDashboard.SEARCH);
      console.log({ response });

      setData(response?.data?.modules || []);
      setLoading(false);
    } catch (error) {
      // console.log({error});
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <AppListDashboard
        data={data}
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        loading={loading}
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
