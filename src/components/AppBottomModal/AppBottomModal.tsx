import { useTheme } from '@theme';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BottomModal } from 'react-native-modals';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { createStyles } from './styles';
export interface AppBottomModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  height?: number;
  width?: number;
  modalStyle?: StyleProp<ViewStyle>;
  isLine?: boolean;
  onSwipeOut?: () => void

}
const AppBottomModal = ({ visible, isLine = true,
  onSwipeOut,
  onClose, children, height, width, modalStyle }: AppBottomModalProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const handleGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      const { translationY } = event;
      console.log({ translationY });

      if (translationY > 100) {
        onClose?.();
      }
    },
  });
  return (
    <BottomModal
      height={height}
      width={width}
      modalStyle={[styles.modalContainer, modalStyle]}
      visible={visible}

      onSwipeOut={() => onSwipeOut ? onSwipeOut() : onClose?.()}

      onTouchOutside={() => onClose?.()} >
      <View style={styles.container} >
        {/* <PanGestureHandler onGestureEvent={handleGesture}> */}
        <>
          {children}
          {isLine && <View style={styles.line} />}
        </>
        {/* </PanGestureHandler> */}

      </View>
    </BottomModal>
  );
};

export default AppBottomModal;
