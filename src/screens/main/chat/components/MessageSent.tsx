import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { ChatInterface, MessageStatus } from '@types';
import { checkMessageTime } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export interface MessageSentProps {
  item: ChatInterface;
  user: {
    id: string | number;
    name: string;
    avatar: string;
  },
  handleReply: (item: ChatInterface) => void;
}

export function MessageSent(props: MessageSentProps) {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { item, user, handleReply } = props;
  const translateX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationX < -50) {
      handleReply(item);
    }
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const renderImages = () => {

    if (item.content.images[0].startsWith('file://')) {
      return <AppImage defaultSource={{
        uri: item.content.images[0],
      }} style={styles.images} />;
    } else {
      return <AppImage uri={item.content.images[0]} style={styles.images} />;
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
            {item.reply && (
              <View style={styles.viewRelied}>
                <AppText style={styles.titleRelied}>{item.reply.text}</AppText>
                <AppText style={styles.repliedText}>{item.reply.text}</AppText>
              </View>
            )}
            {item?.content?.images?.length > 0 && renderImages()}
            {item?.content?.game?.length > 0 && <AppText>Game: {item.content.game}</AppText>}
            {item?.content?.text && <AppText style={styles.txtMessage}>{item?.content?.text}</AppText>}
            <View style={styles.viewRead}>
              <AppText style={styles.timestamp}>{checkMessageTime(item.content?.time_created)}</AppText>

              <AppText style={styles.timestamp}>{item?.content?.status === MessageStatus.RECEIVED ? t('message.Read') : t('message.Unread')}</AppText>

            </View>
          </View>
          {/* </LinearGradient> */}
        </View>

        <View>
          <AppImage style={styles.avatar} uri={user?.avatar} />
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
    width: '80%',
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
});
