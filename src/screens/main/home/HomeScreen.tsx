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

      <MemoizedHeaderHome
        styleHeader={[headerBackgroundColorStyle]}
      />
    </View>
  );
};

const MemoizedHeaderHome = React.memo(HeaderHome);

export default HomeScreen;
