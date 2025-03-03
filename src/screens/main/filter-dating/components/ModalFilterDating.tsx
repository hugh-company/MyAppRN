import { AppBottomModal, AppButton, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { genderInterface } from '@types';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface ModalFilterDatingProps {
  visible: boolean;
  onClose: () => void;
  onFilter?: (value: filterParams) => void;
  filter?: filterParams
}
interface filterParams {
  gender: string;
  distance: number[]
  age: number[];
}
const defaultFilter: filterParams = {
  gender: '',
  distance: [20],
  age: [18, 30],
};
export function ModalFilterDating(props: ModalFilterDatingProps) {
  const {
    visible,
    onClose,
    onFilter,
  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const gender = [
    {
      label: t('girl'),
      value: genderInterface.FEMALE,
    },
    {
      label: t('male'),
      value: genderInterface.MALE,
    },
    // {
    //   label: t('allGender'),
    //   value: genderInterface.OTHER,
    // },
  ];
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFilter,
  });
  useEffect(() => {
    if (visible) {
      reset({
        ...defaultFilter,
        ...props.filter,
      });
    }
  }, [visible]);
  const onSubmit = handleSubmit((value) => {
    onFilter?.(value);
    onClose?.();
  }
  );

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
              {t('gender')}
            </AppText>
            <View style={styles.listGender}>
              {gender.map((item, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name="gender"
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
            name="distance"
            render={({ field: { onChange, value } }) => (
              <View style={styles.viewLocation}>
                <View style={styles.viewRow}>
                  <AppText style={styles.title}>
                    {t('maxLocation')}
                  </AppText>
                  <AppText style={styles.txtValue}>
                    {`${value} km`}
                  </AppText>
                </View>
                <MultiSlider
                  values={value}
                  sliderLength={WidthScreen - Spacing.width32}
                  onValuesChangeFinish={onChange}
                  min={1}
                  max={200}
                  step={1}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.boxSlider}
                />
              </View>
            )}
          />
          {/* age */}
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <View style={styles.viewLocation}>
                <View style={styles.viewRow}>
                  <AppText style={styles.title}>
                    {t('age')}
                  </AppText>
                  <AppText style={styles.txtValue}>
                    {[value[0], value[1]].join(' - ')}
                  </AppText>
                </View>
                <MultiSlider
                  values={value}
                  sliderLength={WidthScreen - Spacing.width32}
                  onValuesChangeFinish={onChange}
                  min={15}
                  max={80}
                  step={1}

                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.boxSlider}
                />

              </View>
            )}
          />
          <AppButton label={t('apply')} onPress={() => onSubmit()} />
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

});
