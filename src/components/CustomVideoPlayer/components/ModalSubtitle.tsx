import { AppBottomModal, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, useTheme, WidthScreen } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ModalSpeedProps {
  visible: boolean;
  onClose: () => void;
  currentSpeed?: number;
  onSelectSpeed?: (speed: number) => void;
}
export const ModalSpeed = ({ visible, onClose, currentSpeed, onSelectSpeed }: ModalSpeedProps) => {

  const { bottom } = useSafeAreaInsets();

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  const dataSpeed = [
    { label: '0.25x', value: 0.25 },
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 },
  ];

  return (
    <AppBottomModal
      visible={!!visible} // Ensure isVisible is a boolean
      onClose={onClose}
      onSwipeOut={onClose}
      height={0.7}
      modalStyle={{ width: WidthScreen }}
    >
      <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
        <View style={styles.body}>
          <AppText style={styles.title}>{t('movie.speed')}</AppText>
          <View style={styles.list}>
            {dataSpeed.map((item, index) => (
              <TouchableOpacity onPress={() => {
                onSelectSpeed && onSelectSpeed(item.value);
              }} key={index} style={[styles.item, currentSpeed === item.value && styles.btnActive]}>
                <AppText style={styles.textItem}>{item.label}</AppText>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>
    </AppBottomModal>
  );
};
const createStyles = (themeColors: any) => StyleSheet.create({
  container: {
    backgroundColor: themeColors.background,

  },
  title: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,

  },
  subtitle: {  // New subtitle style
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
    color: themeColors.textSecondary,
    marginTop: Spacing.width8,
  },
  description: {},

  body: {
    padding: Spacing.width8,
  },
  list: {
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    height: Spacing.height40,
    paddingHorizontal: Spacing.width8,
  },
  btnActive: {
    backgroundColor: themeColors.btnSocial,
    borderRadius: Spacing.width8,
  },
  textItem: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_400,
  },
});
