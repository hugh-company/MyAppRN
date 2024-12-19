import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useGameScreen } from './GameScreen.hook';

const GameScreen = () => {
  const { data, themeColors, styles } = useGameScreen();

  return (
    <View style={styles.container}>
      <AppText>GameScreen</AppText>
    </View>
  );
};

export default GameScreen;
