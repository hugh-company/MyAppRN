import { AppText } from '@components';
import React from 'react';
import { useTheme } from '@theme';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface AppNoticesProps{}
const AppNotices = ({}:AppNoticesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText>AppNotices</AppText>
    </View>
  );
};

export default AppNotices;
