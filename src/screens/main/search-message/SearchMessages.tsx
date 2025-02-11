import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useSearchMessages } from './SearchMessages.hook';

const SearchMessages = () => {
  const { data, themeColors, styles } = useSearchMessages();

  return (
    <View style={styles.container}>
      <AppText>SearchMessages</AppText>
    </View>
  );
};

export default SearchMessages;
