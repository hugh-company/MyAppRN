import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ChatInterface, MessageType } from '@types';
import { checkMessageTime } from '@utils';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export interface MessageReceivedProps {
  item: ChatInterface;
  user: {
    id: string | number;
    name: string;
    avatar: string;
  },
  handleReply: (item: any) => void;

}

export function MessageReceived(props: MessageReceivedProps) {
  const { item, user, handleReply } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const translateX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationX > 50) {
      handleReply(item);
    }
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onEnded={handleGestureEnd}
      activeOffsetX={[-1000, 50]} // Only respond to right swipes
    >
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <View>
          <AppImage style={styles.avatar} isBase={false} uri={user?.avatar} />
          <View style={styles.status} />
        </View>
        <View style={styles.message}>
          {item.reply && (
            <View style={styles.viewRelied}>
              <AppText style={styles.titleRelied}>{item.reply.text}</AppText>
              <AppText style={styles.repliedText}>{item.reply.text}</AppText>
            </View>
          )}
          {item.content?.type === MessageType.IMAGE && item?.content?.images?.length > 0 && <AppImage uri={item.content.images[0]} style={styles.images} />}
          {item.content?.type === MessageType.GAME && item?.content?.game && <AppText>Game: {item.content.game}</AppText>}
          <AppText style={styles.txtMessage}>{item?.content?.text}</AppText>
          <AppText style={styles.timestamp}>{checkMessageTime(item.content?.time_created)}</AppText>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const createStyles = (themeColors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: Spacing.width16,

    },
    avatar: {
      width: Spacing.width48,
      height: Spacing.width48,
      borderRadius: Spacing.width16,
    },
    status: {
      width: Spacing.width15,
      height: Spacing.width15,
      borderRadius: Spacing.width15,
      backgroundColor: themeColors.active,
      position: 'absolute',
      top: -Spacing.width4,
      right: -Spacing.width4,
      borderWidth: 2,
      borderColor: themeColors.whiteColor,
    },
    message: {
      backgroundColor: 'rgba(41, 41, 41, 0.7)',
      minWidth: Spacing.width100,
      maxWidth: WidthScreen * 0.7,
      padding: Spacing.width16,
      gap: Spacing.width24,
      borderTopLeftRadius: Spacing.width16,
      borderBottomRightRadius: Spacing.width16,
      borderTopRightRadius: Spacing.width16,
    },
    txtMessage: {
      color: themeColors.onSurface,
    },
    timestamp: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,
    },

    images: {
      width: Spacing.width150,
      height: Spacing.width150,
      borderRadius: Spacing.width16,
    },
    viewRelied: {
      borderLeftColor: themeColors.whiteColor,
      borderLeftWidth: 2,
      backgroundColor: 'rgba(0,0,0,0.5)',
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
      marginBottom: Spacing.width8,
    },
  });
};
