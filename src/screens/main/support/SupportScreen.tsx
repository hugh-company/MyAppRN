import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useSupportScreen } from './SupportScreen.hook';

const SupportScreen = () => {
  const { data, themeColors, styles } = useSupportScreen();

  return (
    <View style={styles.container}>
      <AppText>SupportScreen</AppText>
    </View>
  );
};

export default SupportScreen;
