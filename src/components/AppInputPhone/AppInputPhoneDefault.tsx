import { CloseIcon, DropdownIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
import { ModalCountry } from './ModalCountry';
import { country } from './country';

interface AppInputPhoneDefaultProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  value?: {
    code: string;
    number: string;
  };
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  onChangeText?: (value: { code: string; number: string }) => void;
}
export interface countryInterface {
  cca2: string;
  name?: string;
  flag?: string;
  callingCode?: string;
  region?: string;
  subregion?: string;

}
const AppInputPhoneDefault = forwardRef<TextInput, AppInputPhoneDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    style,
    value,
    labelStyle,
    errorStyle,
    onChangeText,
    ...inputProps
  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const itemCountrySelect = useMemo(() => country.find((elm) => elm.cca2 === (value?.code || 'VN')), [value?.code]);
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setIsVisibleModal(true)} style={styles.inputCode}>
            <AppImage uri={itemCountrySelect?.flag} isBase={false} style={{ width: Spacing.width20, height: Spacing.width15 }} />
            <AppText style={styles.inputCodeText}>{`(+${itemCountrySelect?.callingCode})`}</AppText>
            <DropdownIcon />
          </TouchableOpacity>
          <TextInput
            ref={ref}
            style={[
              styles.input,
              value && { paddingRight: Spacing.width45 },
              style,
              error ? styles.inputError : null,
            ]}
            placeholderTextColor={themeColors.placeholder}
            {...inputProps}
            onChangeText={(text) => {
              onChangeText?.({
                code: value?.code || '',
                number: text,
              });
            }}
            value={value?.number}
            keyboardType="phone-pad"
            maxLength={15}
          />
          {value && <TouchableOpacity style={styles.btnClearValue} onPress={() => {

            onChangeText?.({
              code: value?.code || '',
              number: '',
            });
          }}>
            <CloseIcon />
          </TouchableOpacity>}

        </View>
        {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
      </View>

      <ModalCountry
        value={value?.code || ''}
        visible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        onSelectCountry={(item) => {
          onChangeText?.({
            code: item.cca2,
            number: value?.number || '',
          });
        }}
      />
    </>
  );
});

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({

  container: {
    marginBottom: Spacing.height16,
  },
  label: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,

    marginBottom: Spacing.height4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: Spacing.width4,

  },
  input: {
    height: Spacing.height48,

    flex: 1,
    paddingHorizontal: Spacing.width12,
    fontSize: FontSize.FontSize14,
    color: themeColors.text,
    borderWidth: 1,
    borderColor: themeColors.btnSocial,
    borderRadius: Spacing.width8,
  },
  inputError: {
    borderColor: themeColors.error,
  },
  error: {
    color: themeColors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height8,
  },
  iconContainer: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',

  },
  inputCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    borderRadius: Spacing.width8,
    paddingHorizontal: Spacing.width12,
    height: Spacing.height48,
    minWidth: Spacing.width102,
    borderWidth: 1,
    borderColor: themeColors.btnSocial,
  },
  inputCodeText: {
    fontSize: FontSize.FontSize14,
    color: themeColors.subtile,
  },
  btnClearValue: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',
  },
});


export default AppInputPhoneDefault;

