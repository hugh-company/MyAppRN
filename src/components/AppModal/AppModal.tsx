
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Modal, ModalProps } from 'react-native-modals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface AppPopupProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;

}
export const AppModal = ({
  visible,
  onClose,
  children,

  styleContainer,
  style,


  ...props
}: AppPopupProps) => {
  const { themeColors } = useTheme();
  const styles = getStyles(themeColors);
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      onTouchOutside={onClose}
      style={styles.modal}
      {...props}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.container,
            { paddingBottom: bottom || Spacing.width16 },
            styleContainer,
          ]}>
          <View style={[styles.content, style]}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const getStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    modal: {
      margin: 0,
    },
    container: {
      backgroundColor: themeColors.background,
    },
    header: {
      backgroundColor: themeColors.background,

      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.width16,
    },
    closeIcon: {
      padding: Spacing.width12,

      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {},
    txt: {
      ...FontWithFamily.FontWithFamily_700,
      fontSize: FontSize.FontSize18,
      color: themeColors.text,
      flex: 1,
      paddingHorizontal: Spacing.width82,
      textAlign: 'center',
    },
  });
