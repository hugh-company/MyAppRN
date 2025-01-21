import { BackgroundCreateProfile, LocationIcon2 } from '@assets';
import { AppButton, AppImage, AppText } from '@components';
import { navigate, navigateToStack, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useDashboardCreateProfile } from './DashboardCreateProfile.hook';

const DashboardCreateProfile = () => {
  const { data, token, styles, goToSettingLocation, isPermissionLocation } = useDashboardCreateProfile();

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
      <AppText style={styles.title}>{t('dating.titleMeetingNewPeople')}</AppText>
      <AppImage defaultSource={BackgroundCreateProfile} style={styles.images} />
      <AppButton
        style={styles.btn}
        label={token ? t('dating.createProfile') : t('dating.loginNow')}
        onPress={() => !token ? navigateToStack(SCREEN_ROUTE.AUTH_STACK, SCREEN_ROUTE.LOGIN) : navigate(SCREEN_ROUTE.CREATE_PROFILE)} />
    </View>
  );
};

export default DashboardCreateProfile;
