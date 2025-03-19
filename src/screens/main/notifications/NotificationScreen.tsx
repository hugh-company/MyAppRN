import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useNotificationScreen } from './NotificationScreen.hook';

export const NotificationScreen = () => {
  const { data, themeColors, styles } = useNotificationScreen();

  return (
    <View style={styles.container}>
      <AppText>NotificationScreen</AppText>
    </View>
  );
};

