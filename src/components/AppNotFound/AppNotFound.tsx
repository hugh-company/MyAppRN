import { NotFoundPost } from '@assets';
import { AppImage, AppText } from '@components';
import { useTheme } from '@theme';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface AppNotFoundProps {
  title?: string;
  description?: string;
}
const AppNotFound = ({ title, description }: AppNotFoundProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppImage defaultSource={NotFoundPost} style={styles.image} />
      <View style={styles.viewInfo}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.description}>{description}</AppText>
      </View>
    </View>
  );
};

export default AppNotFound;
