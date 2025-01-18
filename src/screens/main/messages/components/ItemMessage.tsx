import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { MessageItem } from '@types';
import { checkMessageTime } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface ItemMessageProps {
  item: MessageItem;
}

export function ItemMessage(props: ItemMessageProps) {
  const { item } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      navigate(SCREEN_ROUTE.CHAT, { message: item });
    }}>
      <View>
        <AppImage uri={item.user.avatar} isBase={false} style={styles.avatar} />
        {item?.user?.status && <View style={styles.status} />}
      </View>

      <View style={{ flex: 1, gap: Spacing.width8 }}>
        <View style={styles.viewInfo}>
          <AppText style={styles.txtName} numberOfLines={1}>{item.user.name}</AppText>
          <AppText style={styles.txtDate}>{checkMessageTime(item.message?.time)}</AppText>
        </View>

        <View style={styles.infoMessage}>
          <AppText style={styles.txtMessage}>{item.message?.content}</AppText>
          {item?.count > 0 && <View style={styles.ViewCount}>
            <AppText style={styles.txtCount} numberOfLines={3}>{item?.count > 9 ? '9+' : item?.count}</AppText>
          </View>}
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
    // flex: 1,

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
    width: Spacing.width22,
    height: Spacing.width22,
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
    gap: Spacing.width8,
  },
});
