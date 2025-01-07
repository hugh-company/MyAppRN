import { AppText } from '@components';
import React from 'react';
import { View } from 'react-native';
import { useListDating } from './ListDating.hook';

const ListDating = () => {
  const { data, themeColors, styles } = useListDating();

  return (
    <View style={styles.container}>
      <AppText>ListDating</AppText>
    </View>
  );
};

export default ListDating;
