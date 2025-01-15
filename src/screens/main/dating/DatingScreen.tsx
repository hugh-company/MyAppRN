import { HeaderMain } from '@components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useDatingScreen } from './DatingScreen.hook';
import AppListDating from './components/AppListDating';

const DatingScreen = () => {
  const { data, loading, styles } = useDatingScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('navigation.dating')} isHome={false} isSearch={false} />
      <AppListDating
        data={data}
        loading={loading}
      />
    </View>
  );
};

export default DatingScreen;
