import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useNewsScreen } from './NewsScreen.hook';

const NewsScreen = () => {
  const { data, themeColors, styles } = useNewsScreen();

  return (
    <View style={styles.container}>
      <AppText>NewsScreen</AppText>
    </View>
  );
};

export default NewsScreen;
