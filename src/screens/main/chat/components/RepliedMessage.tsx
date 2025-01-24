import { CloseIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ChatInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface RepliedMessageProps {
  message: ChatInterface;
  onClose: () => void;
  isMe?: boolean;
  userReceived?: any
}

export function RepliedMessage(props: RepliedMessageProps) {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const {
    message,
    onClose,
    isMe, userReceived,
  } = props;

  return <View style={styles.container} >
    <AppText style={styles.title}>{t(isMe ? 'message.repliedMe' : 'message.repliedOther').replace('USER', userReceived?.name)}</AppText>
    <AppText style={styles.txt}>{message.content.text}</AppText>
    <TouchableOpacity onPress={() => onClose()} style={styles.btnClose}>
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
