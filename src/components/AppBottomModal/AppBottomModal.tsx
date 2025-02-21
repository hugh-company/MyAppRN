import { useTheme } from '@theme';
import React, { useEffect } from 'react';
import { Dimensions, StyleProp, TouchableWithoutFeedback, useWindowDimensions, View, ViewStyle } from 'react-native';
import { GestureHandlerStateChangeEvent, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyles } from './styles';

export interface AppBottomModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  height?: number;
  width?: number;
  modalStyle?: StyleProp<ViewStyle>;
  isLine?: boolean;
  onSwipeOut?: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AppBottomModal = ({ visible, isLine = true, onSwipeOut, onClose, children, height, width = 1, modalStyle }: AppBottomModalProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    translateY.value = visible ? withTiming(0, { duration: 500 }) : withTiming(windowHeight, { duration: 500 });

    return () => {
      translateY.value = withTiming(windowHeight, { duration: 500 });
    };
  }, [visible, windowHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const onGestureEvent = (event: any) => {
    if (event.nativeEvent.translationY > 50) {
      translateY.value = withTiming(windowHeight, { duration: 500 });
      onSwipeOut ? onSwipeOut() : onClose?.();
    }
  };

  const onHandlerStateChange = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END && event.nativeEvent.translationY > 50) {
      translateY.value = withTiming(windowHeight, { duration: 500 });
      onSwipeOut ? onSwipeOut() : onClose?.();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={[styles.overlay, { display: visible ? 'flex' : 'none' }]}>
        <View style={{ flex: 1 }}>
          <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={[styles.modalContainer, animatedStyle, modalStyle, { height: windowHeight * height, width: windowWidth * width }]}>
              <TouchableWithoutFeedback style={{ flex: 1 }}>
                <View style={styles.container}>
                  {isLine && (
                    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                      <Animated.View>
                        <View style={styles.line} />
                      </Animated.View>
                    </PanGestureHandler>
                  )}
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBottomModal;
