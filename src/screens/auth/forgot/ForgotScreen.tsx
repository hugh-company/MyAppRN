import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useForgotScreen } from './ForgotScreen.hook';

const ForgotScreen = () => {
  const { data, themeColors, styles } = useForgotScreen();

  return (
    <View style={styles.container}>
      <AppText>ForgotScreen</AppText>
    </View>
  );
};

export default ForgotScreen;
