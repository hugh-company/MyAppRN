import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useCreateProfileScreen } from './CreateProfileScreen.hook';

const CreateProfileScreen = () => {
  const { data, themeColors, styles } = useCreateProfileScreen();

  return (
    <View style={styles.container}>
      <AppText>CreateProfileScreen</AppText>
    </View>
  );
};

export default CreateProfileScreen;
