import { AppButton, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { FilterKey, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { memo } from 'react';
import { Modal, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    key?: PostTypeKey | FilterKey,
    value?: string,
  }) => void
}
const ModalFilter = memo(({ visible, onClose, styleContainer, data, label, onSelect }: ModalFilterProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.container}>
        <View style={[styles.content, styleContainer, { paddingBottom: bottom + Spacing.width16 }]}>
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
      </TouchableOpacity>
    </Modal>
  );

});

export default ModalFilter;
