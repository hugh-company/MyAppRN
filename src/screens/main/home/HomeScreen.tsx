import React from 'react';
import { View } from 'react-native';
import { useHomeScreen } from './HomeScreen.hook';
import { DatingHome } from './components/DatingHome';
import { HeaderHome } from './components/HeaderHome';
import { MovieHome } from './components/MoviesHome';

const HomeScreen = () => {
  const { data, themeColors, styles, top } = useHomeScreen();

  return (
    <View style={[styles.container]}>
      <HeaderHome>

        <DatingHome />
        <MovieHome />
      </HeaderHome>
    </View>
  );
};

export default HomeScreen;
