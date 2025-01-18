import { AppFlatListAnimated, AppLoadingDating } from '@components';
import { Spacing, ThemeColors, useTheme } from '@theme';
import { ModuleDating, ModuleItemInterface, TabInterface, TypeDatingInterface } from '@types';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonSearch } from './ButtonSearch';
import { ListDatingItem } from './ListDatingItem';
import { ListHorizontalUser } from './ListHorizontalUser';


export interface AppListDatingProps {
  ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined
  data?: ModuleDating[];
  loading?: boolean;
  onRefresh?: () => void;
  onScroll?: (event: any) => void;
  categoryId?: number;
  onSelectedCategory?: (item: TabInterface) => void;
  keyExtractor?: (item: ModuleItemInterface, index: number) => string;
}

const AppListDating = ({
  data = [], onScroll,
  loading, onRefresh,
  ListHeaderComponent,

  keyExtractor,
}: AppListDatingProps) => {


  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = React.useState(false);
  const onRefreshList = useCallback(() => {
    if (onRefresh) {
      setIsReset(true);
      onRefresh();
      setTimeout(() => {
        setIsReset(false);
      }, 1000);
    }
  }, [onRefresh]);

  const renderItem = useCallback(({ item }: { item: ModuleDating }) => {
    switch (item?.type) {
      case TypeDatingInterface.TOP_NAV:
        return <ListHorizontalUser data={item.items || []} onPress={() => { }} />;
      case TypeDatingInterface.BUTTON:
        return <ButtonSearch label={item.label} style={styles.search} />;
      case TypeDatingInterface.USERS_LIST:
        return <ListDatingItem data={item?.items?.data || []} label={item?.label} total={item?.total} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <AppLoadingDating /> :
        <AppFlatListAnimated
          data={data}
          scrollEventThrottle={16}
          style={styles.list}
          ListHeaderComponent={ListHeaderComponent}
          onScroll={onScroll}
          onRefresh={onRefreshList}
          refreshing={isReset}
          keyExtractor={keyExtractor}
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
    list: {
      paddingHorizontal: Spacing.width16,
    },

    search: {
      marginVertical: Spacing.width24,
    },
    //
  });
