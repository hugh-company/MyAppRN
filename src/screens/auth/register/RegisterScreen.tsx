import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useRegisterScreen } from './RegisterScreen.hook';

const RegisterScreen = () => {
  const { data, themeColors, styles } = useRegisterScreen();

  return (
    <View style={styles.container}>
      <AppText>RegisterScreen</AppText>
    </View>
  );
};

export default RegisterScreen;
