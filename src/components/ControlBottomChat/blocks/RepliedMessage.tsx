import { CloseIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { MessageItemInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface RepliedMessageProps {
  message: MessageItemInterface | null;
  onClose?: () => void;
  isMe?: boolean;
  userReceived?: any
}

export function RepliedMessage(props: RepliedMessageProps) {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const {
    message,
    onClose,
    isMe,
    userReceived,
  } = props;
  if (!message) { return <></>; }
  const renderText = () => {
    switch (message.content.type) {
      case 'text':
        return message.content.data?.text;
      case 'image':
        return t('message.repliedGame');
      case 'game':
        return t('message.repliedImage');
      case 'sticker':
        return t('message.repliedSticker');
      default:
        return '';
    }
  };
  return <View style={styles.container} >
    <AppText style={styles.title}>{isMe ? t('message.repliedMe') : t('message.repliedOther').replace('USER', userReceived?.fullname)}</AppText>
    <AppText style={styles.txt}>{renderText()}</AppText>

    <TouchableOpacity onPress={() => onClose?.()} style={styles.btnClose}>
      <CloseIcon size={Spacing.width16} color="white" />
    </TouchableOpacity>
  </View>;
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.width16,
    gap: Spacing.width8,
    width: '100%',
  },
  title: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize12,

  },
  txt: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize12,
    color: themeColors.textTertiary,
    marginRight: Spacing.width16,
  },
  btnClose: {
    position: 'absolute',
    top: -Spacing.width8,
    right: Spacing.width8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: Spacing.width24,
    height: Spacing.width24,
    borderRadius: Spacing.width12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
