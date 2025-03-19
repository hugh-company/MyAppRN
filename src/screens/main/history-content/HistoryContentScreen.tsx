import { AppHeader } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useHistoryContentScreen } from './HistoryContentScreen.hook';

export const HistoryContentScreen = () => {
  const { data, themeColors, styles, params } = useHistoryContentScreen();

  return (
    <View style={styles.container}>
      <AppHeader title={params?.title || ''} />
    </View>
  );
};
