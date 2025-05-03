import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useProfileScreen } from './ProfileScreen.hook';

const ProfileScreen = () => {
  const { data, themeColors, styles } = useProfileScreen();

  return (
    <View style={styles.container}>
      <AppText>ProfileScreen</AppText>
    </View>
  );
};

export default ProfileScreen;
