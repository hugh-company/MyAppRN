import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useConversationScreen } from './ConversationScreen.hook';

const ConversationScreen = () => {
  const { data, themeColors, styles } = useConversationScreen();

  return (
    <View style={styles.container}>
      <AppText>ConversationScreen</AppText>
    </View>
  );
};

export default ConversationScreen;
