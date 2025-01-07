import { AppBottomModal, AppText } from '@components';
import Slider from '@react-native-community/slider';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface ModalFilterDatingProps {
  visible: boolean;
  onClose: () => void;
}
interface filterParams {
  gender: string;
  location: number
  age: {
    from: number;
    to: number;
  };
}
const defaultFilter: filterParams = {
  gender: '',
  location: 0,
  age: {
    from: 0,
    to: 0,
  },
};
export function ModalFilterDating(props: ModalFilterDatingProps) {
  const {
    visible,
    onClose,
  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [filter, setFilter] = React.useState<filterParams>(defaultFilter);
  const gender = [

    {
      label: t('girl'),
      value: 'girl',
    },
    {
      label: t('male'),
      value: 'male',
    },
    {
      label: t('allGender'),
      value: 'all',
    },
  ];
  const onReset = () => {
    setFilter(defaultFilter);
  };
  return <AppBottomModal width={1} height={0.7} visible={visible} onClose={onClose} modalStyle={{ backgroundColor: themeColors.background }} >
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.txtFilter}>{t('filter')}</AppText>

        <TouchableOpacity style={styles.btnReset} onPress={() => onReset()}>
          <AppText style={styles.txtReset}>{t('reset')}</AppText>
        </TouchableOpacity>
      </View>


      {/* gender */}
      <View style={styles.viewGender}>
        <AppText style={styles.title}>
          {t('gender')}
        </AppText>
        <View style={styles.listGender}>
          {gender.map((item, index) => {
            return (
              <TouchableOpacity style={[styles.itemGender, item.value === filter?.gender && styles.selectItemGender]} key={index} onPress={() => {
                setFilter({
                  ...filter,
                  gender: item.value,
                });
              }
              }>
                <AppText style={styles.txtGender}>{item.label}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>


      </View>
      {/* select location */}
      <View style={styles.viewLocation}>
        <View style={styles.viewRow}>
          <AppText style={styles.title}>
            {t('maxLocation')}
          </AppText>
          <AppText style={styles.txtValue}>
            {`${filter.location} km`}
          </AppText>
        </View>
        <Slider
          style={styles.slider}
          value={filter.location}
          minimumValue={0}
          maximumValue={100}
          step={1}
          maximumTrackTintColor={themeColors.subtile}
          minimumTrackTintColor={themeColors.primary}

          onValueChange={(value) => {
            setFilter({
              ...filter,
              location: value,
            });
          }
          }

        />
      </View>
    </View>
  </AppBottomModal>;
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    padding: Spacing.width16,

    alignItems: 'center',
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
    marginTop: Spacing.height16,
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
    marginTop: Spacing.width16,
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
});
