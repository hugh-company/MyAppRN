import { AppListDashboard } from '@components';
import { ItemListDashboard } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useHomeScreen } from './HomeScreen.hook';
import { HeaderHome } from './components/HeaderHome';

const HomeScreen = () => {
  const { data, styles,
    scrollHandler,
    onRefresh,
    headerBackgroundColorStyle,
    isLoading, isRefetching, isError,
  } = useHomeScreen();

  return (
    <View style={[styles.container]}>
      <AppListDashboard
        data={data?.data?.modules}
        onScroll={scrollHandler}
        loading={isLoading}
        onRefresh={onRefresh}
        isRefetching={isRefetching}
        key={'home_dashboard'}
        typeScreen={ItemListDashboard.HOME}
        keyExtractor={(item, index) => `home_dashboard_${index}`}
      />
      <MemoizedHeaderHome
        styleHeader={[headerBackgroundColorStyle]}
      />
    </View>
  );
};

const MemoizedHeaderHome = React.memo(HeaderHome);

export default HomeScreen;
