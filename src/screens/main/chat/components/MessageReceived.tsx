import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { MessageItemInterface, MessageType, OtherUser } from '@types';
import { checkMessageTime } from '@utils';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { getStickerIconWithMessage } from '../../../../utils/getSticker';
import { MessageGame } from './MessageGame';
import { MessageImages } from './MessageImages';
import { MessageRelied } from './MessageReplied';

export interface MessageReceivedProps {
  item: MessageItemInterface;
  userSent: OtherUser,
  userReceived: OtherUser,

  handleReply: (item: MessageItemInterface) => void;
  onGoToRepliedMessage?: (item: MessageItemInterface) => void;
}

export function MessageReceived(props: MessageReceivedProps) {
  const { item, userSent, userReceived, handleReply, onGoToRepliedMessage } = props;
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
      activeOffsetX={[-1000, 50]}
    >
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <View>
          <AppImage style={styles.avatar} uri={userReceived?.avatar} />
          {!!userReceived.online && <View style={styles.status} />}
        </View>
        <View style={[styles.message, item?.content?.data?.sticker && { backgroundColor: 'transparent' }]}>
          {item.content?.replyto && (
            <MessageRelied
              repliedMessage={item.content.replyto}
              onPress={() => onGoToRepliedMessage?.(item.content?.replyto)}
              userReceived={userReceived}
              userSent={userSent} />
          )}
          {item?.content?.type === MessageType.IMAGE && <MessageImages image={{
            images: item.content.data.images as string[],
            images_count: item.content.data.images_count,
          }}
            thread_id={item.thread_id} id={item.id} />}
          {item?.content?.type === MessageType.GAME && item.content?.data?.games?.length > 0 && <MessageGame list={item.content?.data?.games} />}
          {item?.content?.data?.sticker && <AppImage uri={getStickerIconWithMessage(item?.content?.data?.sticker)} style={styles.sticker} isBase={false} />}

          {item?.content?.data?.text?.length > 0 && <AppText style={styles.txtMessage}>{item?.content?.data?.text}</AppText>}
          <View style={styles.viewRead}>

            <AppText style={styles.timestamp}>{checkMessageTime(item.content?.created_at)}</AppText>

            {/* {renderStatusMessage()} */}
          </View>
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
    sticker: {
      width: Spacing.width100,
      height: Spacing.width100,

    },
    txtMessage: {
      color: themeColors.onSurface,
    },
    timestamp: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,
    },
    viewRead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: Spacing.width4,
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
