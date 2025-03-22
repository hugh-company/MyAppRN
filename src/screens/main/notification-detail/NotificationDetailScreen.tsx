import { AppHeader, AppText } from '@components';
import { FontWithFamily } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import { useNotificationDetailScreen } from './NotificationDetailScreen.hook';

export const NotificationDetailScreen = () => {
  const { description, title, themeColors, styles } = useNotificationDetailScreen();
  const { width: contentWidth } = useWindowDimensions(); // Get screen width
  const customRenderersProps = {
    tagsStyles: {
      a: {
        color: themeColors.text,
        ...FontWithFamily.FontWithFamily_400,
      },
      p: {
        color: themeColors.text,
        ...FontWithFamily.FontWithFamily_400,
      },
      div: {
        color: themeColors.text,
        ...FontWithFamily.FontWithFamily_400,
      },
    },
  };
  return (
    <View style={styles.container}>
      <AppHeader title={t('notification')} />
      <ScrollView style={styles.list}>
        <AppText style={styles.title}>{title}</AppText>
        <RenderHTML
          source={{ html: description }}

          contentWidth={contentWidth} // Add contentWidth for proper rendering
          {...customRenderersProps} // Spread custom styles
        />
      </ScrollView>
    </View>
  );
};

