import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useVerifyCodeScreen } from './VerifyCodeScreen.hook';

const VerifyCodeScreen = () => {
  const { data, themeColors, styles } = useVerifyCodeScreen();

  return (
    <View style={styles.container}>
      <AppText>VerifyCodeScreen</AppText>
    </View>
  );
};

export default VerifyCodeScreen;
