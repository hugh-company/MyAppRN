import { AppButton, AppText } from '@components';
import { useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
export interface ModalFilterProps {
  visible: boolean;
  onClose: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  label?: string;
  data?: {
    key: string,
    value: string,
  }[]
  onSelect?: (item: {
    key: string,
    value: string,
  }) => void
}
const ModalFilter = ({ visible, onClose, styleContainer, data, label, onSelect }: ModalFilterProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal
      visible={visible}
      onTouchOutside={onClose}
      style={styles.container}
      modalStyle={styles.modal}
      width={1}
    >
      <ModalContent style={[styles.content, styleContainer, { paddingBottom: bottom }]}>
        <View >
          <View style={styles.list}>
            <View style={styles.item}>
              <AppText style={styles.title}>{label}</AppText>
            </View>
            {data?.map(elm => (
              <TouchableOpacity key={elm.key} onPress={() => {
                onClose?.();
                onSelect?.(elm);
              }} style={styles.item}>
                <AppText style={styles.txtItem}>{elm.value}</AppText>
              </TouchableOpacity>
            ))}
          </View>
          <AppButton label={t('cancel')} labelStyle={styles.txtCancel} style={styles.cancel} onPress={() => {
            onClose?.();

          }} />
        </View>
      </ModalContent>
    </Modal>
  );
};

export default ModalFilter;
