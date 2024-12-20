import React from 'react';
import { View } from 'react-native';
import { useHomeScreen } from './HomeScreen.hook';
import { DatingHome } from './components/DatingHome';
import { GameHome } from './components/GameHome';
import { HeaderHome } from './components/HeaderHome';
import { MovieHome } from './components/MoviesHome';
import { StoryHome } from './components/StoryHome';

const HomeScreen = () => {
  const { data, themeColors, styles, top } = useHomeScreen();

  return (
    <View style={[styles.container]}>
      <HeaderHome>

        <DatingHome />
        <MovieHome />
        <GameHome />
        <StoryHome />
      </HeaderHome>
    </View>
  );
};

export default HomeScreen;
