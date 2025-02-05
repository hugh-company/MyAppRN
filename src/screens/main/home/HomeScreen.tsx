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
    loading,
  } = useHomeScreen();

  return (
    <View style={[styles.container]}>
      <MemoizedAppListDashboard
        data={data}
        onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}
        key={'home_dashboard'}
        typeScreen={ItemListDashboard.HOME}
        keyExtractor={(item, index) => `home_dashboard_${index}`}
      />
      <MemoizedHeaderHome
        styleHeader={[headerBackgroundColorStyle, headerBackgroundColorStyle]}
      />
    </View>
  );
};

const MemoizedAppListDashboard = React.memo(AppListDashboard);
const MemoizedHeaderHome = React.memo(HeaderHome);

export default HomeScreen;
