import { AppButton } from '@components';
import React from 'react';
import { View } from 'react-native';
import LoginContainer from '../../auth/login/LoginContainer';
import { useProfileScreen } from './ProfileScreen.hook';

const ProfileScreen = () => {
  const { data, themeColors, styles, token, onLogout } = useProfileScreen();

  const renderProfile = () => {
    return (
      <View style={styles.profile}>
        <AppButton label='Logout' onPress={() => onLogout()} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {!token ? (
        <LoginContainer />
      ) : (
        renderProfile()
      )}
    </View>
  );
};

export default ProfileScreen;
