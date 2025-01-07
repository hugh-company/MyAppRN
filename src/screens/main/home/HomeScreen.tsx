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
      <AppListDashboard
        data={data}
        onScroll={scrollHandler}
        loading={loading}
        onRefresh={onRefresh}
        typeScreen={ItemListDashboard.HOME}
      />
      <HeaderHome
        styleHeader={[headerBackgroundColorStyle, headerBackgroundColorStyle]}
      />
    </View>
  );
};

export default HomeScreen;
