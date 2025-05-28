import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useGiftScreen } from './GiftScreen.hook';

const GiftScreen = () => {
  const { data, themeColors, styles } = useGiftScreen();

  return (
    <View style={styles.container}>
      <AppText>GiftScreen</AppText>
    </View>
  );
};

export default GiftScreen;
