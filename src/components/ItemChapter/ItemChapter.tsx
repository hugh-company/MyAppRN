import { AppText } from '@components';
import React from 'react';
import { useTheme } from '@theme';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface ItemChapterProps{}
const ItemChapter = ({}:ItemChapterProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText>ItemChapter</AppText>
    </View>
  );
};

export default ItemChapter;
