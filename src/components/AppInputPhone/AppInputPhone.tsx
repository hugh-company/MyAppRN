import React, { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import AppInputPhoneDefault from './AppInputPhoneDefault';

interface AppInputPhoneProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  control?: Control<T>;
  name?: Path<T>;
}

const AppInputPhone = forwardRef<TextInput, AppInputPhoneProps<any>>((props, ref) => {
  const {
    label,
    control,
    name,
    ...inputProps
  } = props;

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
          <AppInputPhoneDefault
            ref={ref}
            {...inputProps}
            label={label}
            value={value}
            onChangeText={onChange}
            error={fieldError?.message}
          />
        )}
      />
    );
  }

  return (
    <AppInputPhoneDefault ref={ref} label={label}  {...inputProps} />
  );
});

export default AppInputPhone;
