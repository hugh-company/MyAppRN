import { HeaderMain } from '@components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useDatingScreen } from './DatingScreen.hook';
import AppListDating from './components/AppListDating';
import { ListHorizontalUser } from './components/ListHorizontalUser';

const DatingScreen = () => {
  const { data, loading, styles, tab, tabNav, onSelectTab } = useDatingScreen();

  return (
    <View style={styles.container}>
      <HeaderMain
        title={t('navigation.dating')}
        isHome={false}
        isSearch={false}

      />
      <ListHorizontalUser
        data={tabNav || []}
        tabSelected={tab}
        onPress={(item) => {
          onSelectTab(item.heading as any);
        }}
        style={styles.tab}

      />
      <AppListDating
        data={data}
        loading={loading}
      />
    </View>
  );
};

export default DatingScreen;
