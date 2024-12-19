import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useDatingScreen } from './DatingScreen.hook';

const DatingScreen = () => {
  const { data, themeColors, styles } = useDatingScreen();

  return (
    <View style={styles.container}>
      <AppText>DatingScreen</AppText>
    </View>
  );
};

export default DatingScreen;
