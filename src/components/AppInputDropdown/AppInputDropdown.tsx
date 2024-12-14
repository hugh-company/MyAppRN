import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AppText } from '../AppText';
import { AppInputDropdownDefaultProps, AppInputDropdownProps } from './AppInputDropdown.type';
import { styles } from './styles';


const AppInputDropdownDefault = forwardRef<SelectDropdown, AppInputDropdownDefaultProps>((props, ref) => {
  const { data, value, containerStyle, styleInput, label, labelStyle, placeholder, onSelect, error, errorStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <SelectDropdown
        ref={ref}
        defaultValue={value}
        data={data}
        onSelect={(selectedItem, index) => {
          onSelect && onSelect(selectedItem, index);
        }}

        renderButton={() => {
          return (
            <View style={styles.input}>
              <AppText style={[styles.txtInput, value ? styles.txtInput : styles.txtPlaceholder, styleInput]}>
                {(value && data.find(item => item.value === value)?.label) || placeholder}
              </AppText>
            </View>
          );
        }}

        dropdownStyle={styles.dropdownMenuStyle}
        renderItem={(item) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(item.value === value && { backgroundColor: '#D2D9DF' }) }}>
              <AppText numberOfLines={1} style={styles.dropdownItemTxtStyle}>{item.label}</AppText>
            </View>
          );
        }}
      />
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
    </View>
  );
});

const AppInputDropdown = forwardRef<SelectDropdown, AppInputDropdownProps<any>>((props, ref) => {
  const { data, onSelect, control, name, containerStyle, styleInput, label, labelStyle, placeholder, error, errorStyle } = props;

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
          <AppInputDropdownDefault
            data={data}
            value={value}
            onSelect={(selectedItem) => {
              onChange(selectedItem.value);
            }}
            ref={ref}
            containerStyle={containerStyle}
            styleInput={styleInput}
            label={label}
            labelStyle={labelStyle}
            placeholder={placeholder}
            error={fieldError?.message}
            errorStyle={errorStyle}
          />
        )}
      />
    );
  } else {
    return (
      <AppInputDropdownDefault
        data={data}
        onSelect={onSelect}
        containerStyle={containerStyle}
        styleInput={styleInput}
        label={label}
        labelStyle={labelStyle}
        placeholder={placeholder}
        error={error}
        errorStyle={errorStyle}
      />
    );
  }
});

export default AppInputDropdown;
