import React from 'react';
import { View } from 'react-native';

import { AppHeader } from '@components';
import { useDetailScreen } from './DetailScreen.hook';
import { AppListDetailService } from './components/AppListDetailService';

const DetailScreen = () => {
  const { data, themeColors, styles, params } = useDetailScreen();

  return (
    <View style={styles.container}>
      <AppHeader title={params.name || ''} isBackground />
      <AppListDetailService data={params?.data || []} />
    </View>
  );
};

export default DetailScreen;
