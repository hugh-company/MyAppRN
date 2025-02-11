import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      {...props}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}>
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      margin: 0,
    },
    container: {
      backgroundColor: themeColors.background,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
