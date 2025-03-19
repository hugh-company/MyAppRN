import { AppText } from '@components';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { FilterKey, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { memo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ModalFilterProps {
  value?: string;
  refBottomSheet?: React.RefObject<BottomSheetModal>;
  styleContainer?: StyleProp<ViewStyle>;
  label?: string;
  data?: {
    key: string,
    value: string,
  }[]
  onSelect?: (item: {
    key?: PostTypeKey | FilterKey,
    value?: string,
  }) => void;
  disableReset?: boolean; // New prop
}

export const FilterListModal = memo(({ refBottomSheet, styleContainer, data, label, onSelect, value, disableReset }: ModalFilterProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { bottom } = useSafeAreaInsets();



  return (
    <BottomSheetModal
      ref={refBottomSheet}
      backgroundStyle={[styles.modalContainer]}
      snapPoints={[Spacing.height302, Spacing.height302]}
      onDismiss={() => {
        refBottomSheet?.current?.close();
      }}
    >
      <View style={[styles.content, styleContainer, { paddingBottom: bottom + Spacing.width16 }]}>
        <View style={styles.list}>

          <View style={styles.viewHeader}>
            <AppText style={styles.title}>{label}</AppText>
            <TouchableOpacity
              onPress={() => {
                if (!disableReset) {
                  refBottomSheet?.current?.close();
                  onSelect?.({ key: '', value: '' });
                }
              }}
              style={[styles.done, disableReset && { opacity: 0.5 }]} // Disable button style
              disabled={disableReset} // Disable button interaction
            >
              <AppText style={[styles.title, { ...FontWithFamily.FontWithFamily_400 }]}>{t('reset')}</AppText>
            </TouchableOpacity>
          </View>
          <BottomSheetFlatList
            data={data}
            keyExtractor={item => item.key}
            contentContainerStyle={{ height: Spacing.height302 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  refBottomSheet?.current?.close();
                  onSelect?.(item);
                }}
                style={[styles.item, value === item.key && styles.active]}
              >
                <AppText style={styles.txtItem}>{item.value}</AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </BottomSheetModal>
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
    },
    viewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width8,

    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.text,
    },
    list: {

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

    item: {
      height: Spacing.height40,
      paddingHorizontal: Spacing.width16,
      justifyContent: 'center',

    },
    txtItem: {
    },
    active: {
      backgroundColor: themeColors.btnSocial,
    },
    modalContainer: {
      backgroundColor: themeColors.background,
    },
    done: {
      height: Spacing.height30,
      paddingHorizontal: Spacing.width16,
    },
  });
