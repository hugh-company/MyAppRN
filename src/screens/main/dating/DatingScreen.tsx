import { LocationIcon2, MessageIcon } from '@assets';
import { AppButton, AppText, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDatingScreen } from './DatingScreen.hook';
import AppListDating from './components/AppListDating';
import { ListHorizontalUser } from './components/ListHorizontalUser';

const DatingScreen = () => {
  const { data, loading, styles, tab, tabNav, onSelectTab, isPermissionLocation, goToSettingLocation } = useDatingScreen();

  if (!isPermissionLocation) {
    return (
      <View style={styles.containerLocation}>
        <LocationIcon2 width={Spacing.width100} height={Spacing.width100} />
        <AppText style={styles.titleLocation}>{t('permission.permission_location')}</AppText>
        <AppText style={styles.desLocation}>{t('permission.des_permission_location')}</AppText>
        <AppButton isWrap style={styles.btnLocation} label={t('permission.setting_location')} onPress={goToSettingLocation} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <HeaderMain
        title={t('navigation.dating')}
        isHome={false}
        isSearch={false}
        renderIconRight={<TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.MESSAGES)} style={styles.btnMessage}>
          <MessageIcon />
        </TouchableOpacity>}
      />
      <ListHorizontalUser
        data={tabNav || []}
        tabSelected={tab}
        onPress={(item) => {
          onSelectTab(item.type as any);
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
