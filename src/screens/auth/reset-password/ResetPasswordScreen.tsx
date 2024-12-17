import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useResetPasswordScreen } from './ResetPasswordScreen.hook';

const ResetPasswordScreen = () => {
  const { data, themeColors, styles } = useResetPasswordScreen();

  return (
    <View style={styles.container}>
      <AppText>ResetPasswordScreen</AppText>
    </View>
  );
};

export default ResetPasswordScreen;
