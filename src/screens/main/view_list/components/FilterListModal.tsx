import { AppButton, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { FilterKey, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { memo } from 'react';
import { Modal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ModalFilterProps {
  value?: string;
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
export const FilterListModal = memo(({ visible, onClose, styleContainer, data, label, onSelect, value }: ModalFilterProps) => {
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
              }} style={[styles.item, value === elm.key && styles.active]}>
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

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      margin: 0,
      flex: 1,
    },
    content: {
      margin: 0,

      // Add this line to round the top corners
    },
    list: {
      backgroundColor: '#C8C7C8',
      borderRadius: Spacing.width12,
      marginBottom: Spacing.width8,
    },
    modal: {
      backgroundColor: 'transparent',
    },
    cancel: {
      backgroundColor: themeColors.whiteColor,
      borderRadius: Spacing.width16,
    },
    txtCancel: {
      color: themeColors.txtLink,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.btnSocial,
    },
    item: {
      height: Spacing.height50,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBlockColor: '#9B9B9B',
    },
    txtItem: {
      color: themeColors.btnSocial,
    },
    active: {
      backgroundColor: themeColors.btnSocial,
    },
  });
