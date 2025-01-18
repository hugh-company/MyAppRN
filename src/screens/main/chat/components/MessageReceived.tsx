import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export interface MessageReceivedProps {
  item: any;
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
  console.log('aaa:', user?.avatar);

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
          {item.repliedTo && (
            <AppText style={styles.repliedText}>Replied to: {item.repliedTo.text}</AppText>
          )}
          <AppText style={styles.txtMessage}>{item?.text}</AppText>
          <AppText style={styles.timestamp}>{item.timestamp}</AppText>
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
    repliedText: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize12,
      marginBottom: Spacing.width8,
    },
  });
};
