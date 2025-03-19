import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useNotificationDetailScreen } from './NotificationDetailScreen.hook';

export const NotificationDetailScreen = () => {
  const { data, themeColors, styles } = useNotificationDetailScreen();

  return (
    <View style={styles.container}>
      <AppText>NotificationDetailScreen</AppText>
    </View>
  );
};

