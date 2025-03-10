import { AppFlatListAnimated, AppLoadingDating } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing, ThemeColors, useTheme } from '@theme';
import { ModuleItemInterface, TabInterface, UserItemInterface } from '@types';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ItemUserDating } from './ItemUserDating';


export interface AppListDatingProps {
  ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined
  data?: UserItemInterface[];
  loading?: boolean;
  onRefresh?: () => void;
  onScroll?: (event: any) => void;
  categoryId?: number;
  onSelectedCategory?: (item: TabInterface) => void;
  keyExtractor?: (item: ModuleItemInterface, index: number) => string;
  refreshing?: boolean;
  onEndReached?: () => void;

}

const AppListDating = ({
  data = [], onScroll,
  loading, onRefresh,
  ListHeaderComponent,
  refreshing,
  keyExtractor, onEndReached,
}: AppListDatingProps) => {


  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  const renderItem = useCallback(({ item }: { item: UserItemInterface }) => {
    return (
      <ItemUserDating item={item} onPress={() => {
        navigate(SCREEN_ROUTE.DETAIL_USER, { user: item });
      }} />
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <AppLoadingDating /> :
        <AppFlatListAnimated
          data={data}
          scrollEventThrottle={16}
          style={styles.list}
          numColumns={2}
          ListHeaderComponent={ListHeaderComponent}
          onScroll={onScroll}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          columnWrapperStyle={styles.listItem}
          onEndReachedThreshold={0.5}
          onLoadMore={onEndReached}
          renderItem={renderItem} />}
    </View>
  );
};

export default React.memo(AppListDating);
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    listItem: {
      gap: Spacing.width12,
      marginBottom: Spacing.width12,
    },
    list: {
      paddingHorizontal: Spacing.width16,
    },

    search: {
      marginVertical: Spacing.width16,
    },
    //
  });
