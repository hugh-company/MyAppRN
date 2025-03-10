import { AppText } from '@components';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { FontSize, FontWithFamily, HeightScreen, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ModalSpeedProps {
  refModal: React.RefObject<BottomSheetModal> | null;

  currentSpeed?: number;
  onSelectSpeed?: (speed: number) => void;
}
export const ModalSpeed = ({ refModal, currentSpeed, onSelectSpeed }: ModalSpeedProps) => {

  const { bottom } = useSafeAreaInsets();

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const { width, height } = useWindowDimensions();
  const dataSpeed = [
    { label: '0.25x', value: 0.25 },
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPressIn={() => {
        onSelectSpeed && onSelectSpeed(item.value);
        refModal?.current?.dismiss();
      }} style={[styles.item, currentSpeed === item.value && styles.btnActive]}>
        <AppText style={styles.textItem}>{item.label}</AppText>
      </TouchableOpacity>
    );
  };
  return (
    <BottomSheetModal
      ref={refModal}
      snapPoints={[HeightScreen / 2, HeightScreen]}
      backgroundStyle={styles.modal}
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === -1) {
          setTimeout(() => refModal?.current?.dismiss(), 0);
        }
      }}
    >

      <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
        <View style={styles.body}>
          <AppText style={styles.title}>{t('movie.speed')}</AppText>


          <BottomSheetFlatList
            data={dataSpeed}
            keyExtractor={(item) => item.label.toString()}
            renderItem={renderItem}
            removeClippedSubviews
            style={styles.list}
          />
        </View>

      </View>

    </BottomSheetModal>
  );
};

const createStyles = (themeColors: any) => StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: themeColors.background,

  },
  modalContainer: {
    flex: 1,
    backgroundColor: themeColors.background,
  },

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
    padding: Spacing.width16,
    borderTopLeftRadius: Spacing.width16,
    borderTopRightRadius: Spacing.width16,
  },
  list: {
    backgroundColor: themeColors.background,

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
