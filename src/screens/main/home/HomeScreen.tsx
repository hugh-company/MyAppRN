import React from 'react';
import { View } from 'react-native';
import { useHomeScreen } from './HomeScreen.hook';
import { AppListHome } from './components/AppListHome';
import { HeaderHome } from './components/HeaderHome';
import { NavigationControl } from './components/NavigationControl';

const HomeScreen = () => {
  const { data, styles,
    scrollHandler,
    onRefresh,
    bannerHeightStyle,
    isLoading, isRefetching, isError,
  } = useHomeScreen();
  return (
    <View style={[styles.container]}>
      {/* HeaderHome là thành phần nổi, dùng animated style */}
      <HeaderHome />

      {/* AppListHome sẽ tự xử lý scroll và nhận scrollHandler làm prop */}
      <AppListHome data={data} scrollHandler={scrollHandler} ListHeaderComponent={NavigationControl} contentContainerStyle={styles.list} />
    </View>
  );
};

export default HomeScreen;
