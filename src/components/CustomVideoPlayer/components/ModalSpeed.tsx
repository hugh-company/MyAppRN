import { AppText } from '@components';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { FontSize, FontWithFamily, HeightScreen, Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ModalSpeedProps {
  refModal: React.RefObject<BottomSheetModal> | null;
  data?: any[];
  value?: any;
  onSelectSpeed?: (value: any) => void;
  title?: string;
}
export const ModalSpeed = ({ refModal, data, value, onSelectSpeed, title }: ModalSpeedProps) => {

  const { bottom } = useSafeAreaInsets();

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        onSelectSpeed && onSelectSpeed(item.value);
        refModal?.current?.dismiss();
      }} style={[styles.item, value === item.value && styles.btnActive]}>
        <AppText style={styles.textItem}>{item.label}</AppText>
      </TouchableOpacity>
    );
  };
  return (
    <BottomSheetModal
      ref={refModal}
      snapPoints={[HeightScreen / 2]}
      backgroundStyle={styles.modal}
      onDismiss={() => {
        setTimeout(() => refModal?.current?.dismiss(), 0);
      }}

      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === -1) {
          setTimeout(() => refModal?.current?.dismiss(), 0);
        }
      }}
    >

      <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
        <AppText style={styles.title}>{title}</AppText>


        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.label.toString()}
          renderItem={renderItem}
          removeClippedSubviews
          style={styles.list}
          contentContainerStyle={{ minHeight: Spacing.height40 * 7 }}
        />
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
    flex: 1,
    paddingHorizontal: Spacing.width16,

  },
  title: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
    paddingBottom: Spacing.width8,
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
    height: Spacing.height200,
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
