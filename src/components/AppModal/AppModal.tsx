import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import {
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
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
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      // transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      backdropColor={'red'}
    >
      <View

        style={[
          styles.centeredView,
          { height, width },
          styleContainer,
        ]}>
        {/* <View style={[styles.container, { width }, style]}>{children}</View> */}
      </View>
    </Modal>
  );
};

const getStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    centeredView: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundColor: 'red',
    },
    modal: {
      flex: 1,
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
