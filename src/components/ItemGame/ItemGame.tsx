import { AppText } from '@components';
import React from 'react';
import { useTheme } from '@theme';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface ItemGameProps{}
const ItemGame = ({}:ItemGameProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText>ItemGame</AppText>
    </View>
  );
};

export default ItemGame;
