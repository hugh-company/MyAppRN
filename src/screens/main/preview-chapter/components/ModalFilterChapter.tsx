import { AppBottomModal, AppButton, AppSelectColor, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface ModalFilterDatingProps {
  visible: boolean;
  onClose: () => void;
  onFilter?: (value: filterParams) => void
}
interface filterParams {
  styleText: string;
  size: number[];
  color: string;
  background: string;
}
const defaultFilter: filterParams = {
  styleText: '',
  size: [14],
  color: '#FFFFFF',
  background: '#000000',
};
const colors = [{
  label: '#000000',
  value: '#000000',
},
{
  label: '#FFFFFF',
  value: '#FFFFFF',
},
{
  label: '#808080',
  value: '#808080',
},
{
  label: '#FFFF00',
  value: '#FFFF00',
},
{
  label: '#FFC0CB',
  value: '#FFC0CB',
}];
const backgrounds = [
  {
    label: '#000000',
    value: '#000000',
  },
  {
    label: '#FFFFFF',
    value: '#FFFFFF',
  },
  {
    label: '#808080',
    value: '#808080',
  },
  {
    label: '#FFFF00',
    value: '#FFFF00',
  },
  {
    label: '#FFC0CB',
    value: '#FFC0CB',
  },
];
export function ModalFilterChapter(props: ModalFilterDatingProps) {
  const {
    visible,
    onClose,
    onFilter,
  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const gender = [
    {
      label: t('style1'),
      value: 'Roboto-Regular',
    },
    {
      label: t('style2'),
      value: 'Roboto-Bold',
    },
    {
      label: t('style3'),
      value: 'Roboto-Italic',
    },

  ];
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFilter,
  });

  const onSubmit = (data: filterParams) => {
    onFilter?.(data);
    onClose?.();
  };

  const onReset = () => {
    reset(defaultFilter);
  };

  return (

    <AppBottomModal
      width={1}
      height={0.7}
      visible={visible}
      onClose={() => {
        onClose?.();
      }}
      modalStyle={{ backgroundColor: themeColors.background }} >
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText style={styles.txtFilter}>{t('filter')}</AppText>
          <TouchableOpacity style={styles.btnReset} onPress={onReset}>
            <AppText style={styles.txtReset}>{t('reset')}</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {/* gender */}
          <View style={styles.viewGender}>
            <AppText style={styles.title}>
              {t('styleText')}
            </AppText>
            <View style={styles.listGender}>
              {gender.map((item, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name="styleText"
                    render={({ field: { onChange, value } }) => (
                      <TouchableOpacity
                        style={[styles.itemGender, item.value === value && styles.selectItemGender]}
                        onPress={() => onChange(item.value)}
                      >
                        <AppText style={styles.txtGender}>{item.label}</AppText>
                      </TouchableOpacity>
                    )}
                  />
                );
              })}
            </View>


          </View>
          <Controller
            control={control}
            name="size"
            render={({ field: { onChange, value } }) => (
              <View style={styles.viewLocation}>
                <View style={styles.viewRow}>
                  <AppText style={styles.title}>
                    {t('sizeText')}
                  </AppText>
                  <AppText style={styles.txtValue}>
                    {`${value}`}
                  </AppText>
                </View>
                <MultiSlider
                  values={value}
                  sliderLength={WidthScreen - Spacing.width32}
                  onValuesChangeFinish={onChange}
                  min={0}
                  max={100}
                  step={1}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.boxSlider}
                />
              </View>
            )}
          />
          {/* color */}
          <AppSelectColor
            control={control}
            name="color"
            label={t('colorText')}
            data={colors}
          />
          {/* background */}
          <AppSelectColor
            control={control}
            name="background"
            label={t('background')}
            data={backgrounds}
          />
          <AppButton

            label={t('apply')} onPress={handleSubmit(onSubmit)} />
        </View>

      </View>
    </AppBottomModal>
  );
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    padding: Spacing.width16,

    alignItems: 'center',
  },
  body: {
    gap: Spacing.height32,
    marginTop: Spacing.height32,
  },
  header: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',

  },
  txtFilter: {
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_600,
    marginVertical: Spacing.height16,
  },
  btnReset: {
    padding: Spacing.width8,
  },
  txtReset: {
    fontSize: FontSize.FontSize14,
    color: themeColors.primary,
  },
  viewGender: {
    gap: Spacing.height16,

  },
  listGender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: themeColors.btnSocial,
    borderRadius: Spacing.width16,
    height: Spacing.width32,
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: FontSize.FontSize16,

  },
  itemGender: {
    flex: 1,
    height: Spacing.width32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtGender: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  selectItemGender: {
    backgroundColor: themeColors.primary,
  },
  // location
  viewLocation: {
    gap: Spacing.height16,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  txtValue: {
    color: themeColors.subtile,
  },
  slider: {

    height: 40,
  },
  boxSlider: {
    backgroundColor: themeColors.primary,
    borderWidth: 4,
    borderColor: themeColors.whiteColor,
    borderRadius: Spacing.width20,
    width: Spacing.width30,
    height: Spacing.width30,
  },
  customMarker: {
    width: Spacing.width20,
    height: Spacing.width20,
    borderRadius: Spacing.width10,
    backgroundColor: themeColors.primary,
    borderWidth: 2,
    borderColor: themeColors.whiteColor,
  },
  //
  selectedTrack: {
    backgroundColor: themeColors.primary,
    height: Spacing.height6,
  },
  unselectedTrack: {
    backgroundColor: themeColors.subtile,
    height: Spacing.height6,
  },
  viewColor: {
    gap: Spacing.height16,
  },
  listColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: Spacing.width32,
    alignItems: 'center',
  },
  itemColor: {
    flex: 1,
    height: Spacing.width32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.width4,
  },
  selectedItemColor: {
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  viewBackground: {
    gap: Spacing.height16,
  },
  listBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: Spacing.width32,
    alignItems: 'center',
  },
  itemBackground: {
    flex: 1,
    height: Spacing.width32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.width4,
  },
  selectedItemBackground: {
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  picker: {
    width: '100%',
    height: Spacing.width32,
    backgroundColor: themeColors.btnSocial,
    borderRadius: Spacing.width16,
  },
  dropdownButton: {
    width: '100%',
    height: Spacing.width32,
    backgroundColor: themeColors.btnSocial,
    borderRadius: Spacing.width16,
  },
  dropdownButtonText: {
    fontSize: FontSize.FontSize16,
    color: themeColors.text,
  },
  dropdown: {
    backgroundColor: themeColors.background,
  },
  dropdownRow: {
    backgroundColor: themeColors.background,
    height: Spacing.width32,
  },
  dropdownRowText: {
    fontSize: FontSize.FontSize16,
    color: themeColors.text,
  },

});
