import { AppListDashboard, AppText } from '@components';
import { useSearchDashboard } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, StyleSheet, View } from 'react-native';

interface DashboardSearchProps {

}
const MemoizedAppListDashboard = React.memo(AppListDashboard);

const DashboardSearch = ({ }: DashboardSearchProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { data, isLoading } = useSearchDashboard();

  const [shouldRender, setShouldRender] = React.useState(false);
  React.useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRender(true);
    });
    return () => interactionHandle.cancel();
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MemoizedAppListDashboard
        data={data?.data?.modules || []}
        ListHeaderComponent={<AppText style={styles.title}>{t('search.searchVariety')}</AppText>}
        typeScreen={ItemListDashboard.SEARCH}
        key={'search_dashboard'}
        loading={isLoading}
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
