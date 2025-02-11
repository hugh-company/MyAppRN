import { CheckRead, IconReadMessage } from '@assets';
import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { MessageItemInterface, MessageStatus, MessageType, OtherUser } from '@types';
import { checkMessageTime } from '@utils';
import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { MessageGame } from './MessageGame';
import { MessageImages } from './MessageImages';
import { MessageRelied } from './MessageReplied';

export interface MessageSentProps {
  item: MessageItemInterface;
  userSent: OtherUser,
  userReceived: OtherUser,
  handleReply: (item: MessageItemInterface) => void;
  onGoToRepliedMessage?: (item: MessageItemInterface) => void;
}

export function MessageSent(props: MessageSentProps) {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { item, userSent, handleReply, userReceived, onGoToRepliedMessage } = props;
  const translateX = new Animated.Value(0);
  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    {
      useNativeDriver: true,
    }
  );

  const handleGestureEnd = (event) => {
    console.log({ event });

    if (event.nativeEvent.translationX < -50) {
      handleReply(item);
    }

    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };


  const renderStatusMessage = () => {
    switch (item.content.status) {
      case MessageStatus.SENDING:
        return <ActivityIndicator size="small" color={themeColors.whiteColor} />;
      case MessageStatus.RECEIVED:
      case MessageStatus.SEEN:
        return <CheckRead />;
      case MessageStatus.READ:
        return <IconReadMessage />;
      default:
        return <IconReadMessage />;
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onEnded={handleGestureEnd}
      activeOffsetX={[-50, 1000]}
    >
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>

        <View style={styles.containerMessage}>
          {/* <LinearGradient
            colors={['#77051F', '#432617']}

          > */}
          <View style={styles.message}>
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
            {item?.content?.type === MessageType.GAME && item?.content?.data?.games?.length > 0 && <MessageGame list={item.content?.data?.games} />}
            {item?.content?.data?.text && <AppText style={styles.txtMessage}>{item?.content?.data?.text}</AppText>}
            <View style={styles.viewRead}>
              <AppText style={styles.timestamp}>{checkMessageTime(item.content?.created_at)}</AppText>

              {renderStatusMessage()}

            </View>
          </View>
          {/* </LinearGradient> */}
        </View>
        <View>
          <AppImage style={styles.avatar} uri={userSent?.avatar} />
          <View style={styles.status} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // gap: Spacing.width16,


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
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  containerMessage: {
    borderRadius: Spacing.width16,
    marginRight: Spacing.width16,
    backgroundColor: '#77051F',
    maxWidth: '80%',
  },

  images: {
    width: Spacing.width150,
    height: Spacing.width150,
    borderRadius: Spacing.width16,
  },
  message: {
    padding: Spacing.width16,
    gap: Spacing.width24,
    minWidth: Spacing.width100,
    flex: 1,

  },
  txtMessage: {
    color: themeColors.onSurface,
  },
  timestamp: {
    fontSize: FontSize.FontSize10,
    color: themeColors.subtile,

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
  viewRead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.width4,
  },
  iconContainer: {
    position: 'absolute',
    left: -50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
  },
});
