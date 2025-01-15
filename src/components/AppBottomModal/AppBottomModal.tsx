import { useTheme } from '@theme';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { BottomModal } from 'react-native-modals';
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

  return (
    <BottomModal
      height={height}
      width={width}
      modalStyle={[styles.modalContainer, modalStyle]}
      visible={visible}
      useNativeDriver={true}

      onSwipeOut={() => onSwipeOut ? onSwipeOut() : onClose?.()}
      swipeDirection={'down'}
      onTouchOutside={() => onClose?.()} >
      <View style={styles.container} >


        <>
          {children}
          {isLine && <View style={styles.line} />}
        </>



      </View>
    </BottomModal>
  );
};

export default AppBottomModal;
