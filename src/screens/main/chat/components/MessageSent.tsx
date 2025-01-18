import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export interface MessageSentProps {
  item: any;
  user: {
    id: string | number;
    name: string;
    avatar: string;
  },
  handleReply: (item: any) => void;
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

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <AppText style={styles.actionText}>Reply</AppText>
    </View>
  );

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onEnded={handleGestureEnd}
      activeOffsetX={[-50, 1000]} // Only respond to left swipes
    >
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={['#77051F', '#432617']}
          style={styles.containerMessage}
        >
          {item.repliedTo && (
            <AppText style={styles.repliedText}>Replied to: {item.repliedTo.text}</AppText>
          )}
          <View style={styles.message}>
            <AppText style={styles.txtMessage}>{item?.text}</AppText>
            <AppText style={styles.timestamp}>{item.timestamp}</AppText>
          </View>
        </LinearGradient>
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
    borderTopLeftRadius: Spacing.width16,
    borderBottomRightRadius: Spacing.width16,
    borderTopRightRadius: Spacing.width16,

  },
  message: {
    maxWidth: WidthScreen * 0.8,
    padding: Spacing.width16,
    gap: Spacing.width24,
  },
  txtMessage: {
    color: themeColors.onSurface,
  },
  timestamp: {
    fontSize: FontSize.FontSize10,
    color: themeColors.subtile,
    flex: 1,
  },
  repliedText: {
    color: themeColors.subtile,
    fontSize: FontSize.FontSize12,
    marginBottom: Spacing.width8,
  },
});
