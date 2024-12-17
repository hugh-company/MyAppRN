import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useLoginScreen } from './LoginScreen.hook';

const LoginScreen = () => {
  const { data, themeColors, styles } = useLoginScreen();

  return (
    <View style={styles.container}>
      <AppText>LoginScreen</AppText>
    </View>
  );
};

export default LoginScreen;
