import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { MessageItemInterface, OtherUser } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { getStickerIconWithMessage } from '../../../../utils/getSticker';
export interface MessageReliedProps {
  repliedMessage: MessageItemInterface,
  userReceived: OtherUser,
  userSent: OtherUser,
  onPress?: () => void;
}

export function MessageRelied(props: MessageReliedProps) {
  const { repliedMessage, userSent, userReceived, onPress } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderText = () => {
    switch (repliedMessage.content.type) {
      case 'text':
        return repliedMessage.content.data?.text;
      case 'image':
        return t('message.repliedGame');
      case 'game':
        return t('message.repliedImage');
      case 'sticker':
        return 'Sticker';
      default:
        return '';
    }
  };

  return <TouchableOpacity style={styles.viewRelied} onPress={() => {
    onPress && onPress();
  }}>
    <AppText style={styles.titleRelied}>{repliedMessage?.recipient_id !== userSent.id ? userReceived.fullname : userSent.fullname}</AppText>
    <View style={styles.viewSticker}>
      <AppImage uri={getStickerIconWithMessage(repliedMessage?.content?.data?.sticker)} style={{ width: Spacing.width30, height: Spacing.width30 }} isBase={false} />
      <AppText style={styles.repliedText}>{renderText()}</AppText>
    </View>
  </TouchableOpacity>;
}

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  viewSticker: {

  },
  viewRelied: {
    borderLeftColor: themeColors.whiteColor,
    borderLeftWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: Spacing.width8,
    gap: Spacing.width4,
  },
  titleRelied: {
    fontSize: FontSize.FontSize12,
    color: themeColors.whiteColor,
  },
  repliedText: {
    color: themeColors.subtile,
    fontSize: FontSize.FontSize14,

  },
});
