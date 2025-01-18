import { DropdownIcon } from '@assets';
import { AppText } from '@components';
import { useTheme } from '@theme';
import React, { forwardRef, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AppSelectColorDefaultProps, AppSelectColorProps } from './AppSelectColor.type';
import { createStyles } from './styles';

const AppSelectColorDefault = forwardRef<SelectDropdown, AppSelectColorDefaultProps>((props, ref) => {
  const { data, value, containerStyle, styleInput, label, labelStyle, placeholder, onSelect, error, errorStyle } = props;
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
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
              <View style={[styles.valueColor, { backgroundColor: value }]} />
              <DropdownIcon />
            </View>
          );
        }}

        dropdownStyle={styles.dropdownMenuStyle}

        renderItem={(item) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(item.value === value && { backgroundColor: '#D2D9DF' }) }}>
              <View style={[styles.itemColor, { backgroundColor: item.value }]} />
              {/* <AppText numberOfLines={1} style={styles.dropdownItemTxtStyle}>{item.label}</AppText> */}
            </View>
          );
        }}
      />
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
    </View>
  );
});

const AppSelectColor = forwardRef<SelectDropdown, AppSelectColorProps<any>>((props, ref) => {
  const { data, onSelect, control, name, containerStyle, styleInput, label, labelStyle, placeholder, error, errorStyle } = props;

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
          <AppSelectColorDefault
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
      <AppSelectColorDefault
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

export { AppSelectColorDefault };
export default AppSelectColor;
