import { BackgroundCreateProfile } from '@assets';
import { AppButton, AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useDashboardCreateProfile } from './DashboardCreateProfile.hook';

const DashboardCreateProfile = () => {
  const { data, themeColors, styles } = useDashboardCreateProfile();

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{t('dating.titleMeetingNewPeople')}</AppText>
      <AppImage defaultSource={BackgroundCreateProfile} style={styles.images} />
      <AppButton
        style={styles.btn}
        label={t('dating.createProfile')}
        onPress={() => navigate(SCREEN_ROUTE.CREATE_PROFILE)} />
    </View>
  );
};

export default DashboardCreateProfile;
