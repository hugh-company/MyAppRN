import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { getUserInfo } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ConversationInterface, MessageStatus } from '@types';
import { checkMessageTime } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
export interface ItemMessageProps {
  item: ConversationInterface;
}

export function ItemMessage(props: ItemMessageProps) {
  const { item } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const userInfo = useSelector(getUserInfo);
  const sanitizeFullname = (fullname: string) => {
    return fullname?.replace(/[^a-zA-Z0-9 ]/g, '');
  };
  const renderTextMessage = () => {
    switch (item?.last_message?.content?.type) {
      case 'text':
        return item?.last_message?.content?.data?.text;
      case 'image':
        return userInfo?.id === item?.last_message?.sender_id ? t('message.meSendImage') : t('message.userSendImage')?.replace('USER', sanitizeFullname(item?.other_user?.fullname));
      case 'game':
        return userInfo?.id === item?.last_message?.sender_id ? t('message.meSendGame') : t('message.userSendGame')?.replace('USER', sanitizeFullname(item?.other_user?.fullname));
      case 'sticker':
        return userInfo?.id === item?.last_message?.sender_id ? t('message.meSendSticker') : t('message.userSendSticker')?.replace('USER', sanitizeFullname(item?.other_user?.fullname));
      default:
        return '';
    }
  };
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => {
      navigate(SCREEN_ROUTE.CHAT, { message: item });
    }}>
      <View>
        <AppImage uri={item.other_user?.avatar} style={styles.avatar} />
        {item?.other_user?.online && <View style={styles.status} />}
      </View>

      <View style={{ flex: 1, gap: Spacing.width8 }}>
        <View style={styles.viewInfo}>
          <AppText style={styles.txtName} numberOfLines={1}>{sanitizeFullname(item.other_user?.fullname)}</AppText>
          <AppText style={styles.txtDate}>{checkMessageTime(item.last_message?.content?.created_at)}</AppText>
        </View>

        <View style={styles.infoMessage}>
          <AppText style={styles.txtMessage}>{renderTextMessage()}</AppText>
          {item?.last_message?.recipient_id === userInfo?.id && item?.last_message?.content?.status !== MessageStatus.READ && <View style={styles.ViewCount} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.width16,

    gap: Spacing.width16,
  },

  avatar: {
    width: Spacing.width60,
    height: Spacing.width60,
    borderRadius: Spacing.width30,

  },
  status: {
    width: Spacing.width15,
    height: Spacing.width15,
    borderRadius: Spacing.width15,
    backgroundColor: themeColors.active,
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: themeColors.whiteColor,
  },
  viewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,


  },
  txtName: {
    fontSize: FontSize.FontSize16,
    color: themeColors.onSurface,
    ...FontWithFamily.FontWithFamily_600,
    flex: 1,
  },
  txtMessage: {
    fontSize: FontSize.FontSize14,
    color: themeColors.subtile,
    ...FontWithFamily.FontWithFamily_400,
    flex: 1,
  },
  txtDate: {
    fontSize: FontSize.FontSize12,
    color: themeColors.disable,
    ...FontWithFamily.FontWithFamily_400,
  },
  ViewCount: {
    width: Spacing.width12,
    height: Spacing.width12,
    borderRadius: Spacing.width12,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCount: {
    fontSize: FontSize.FontSize12,
    color: themeColors.whiteColor,
    ...FontWithFamily.FontWithFamily_600,
  },
  infoMessage: {
    flexDirection: 'row',
    gap: Spacing.width16,
  },
});
