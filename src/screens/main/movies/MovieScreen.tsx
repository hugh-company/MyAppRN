import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useMovieScreen } from './MovieScreen.hook';

const MovieScreen = () => {
  const { data, themeColors, styles } = useMovieScreen();

  return (
    <View style={styles.container}>
      <AppText>MovieScreen</AppText>
    </View>
  );
};

export default MovieScreen;
