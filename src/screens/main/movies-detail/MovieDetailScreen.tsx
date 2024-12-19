import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useMovieDetailScreen } from './MovieDetailScreen.hook';

const MovieDetailScreen = () => {
  const { data, themeColors, styles } = useMovieDetailScreen();

  return (
    <View style={styles.container}>
      <AppText>MovieDetailScreen</AppText>
    </View>
  );
};

export default MovieDetailScreen;
