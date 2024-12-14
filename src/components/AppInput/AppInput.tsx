import React, { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import InputDefault from './InputDefault';

interface AppInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
  control?: Control<T>;
  name?: Path<T>;
}

const AppInput = forwardRef<TextInput, AppInputProps<any>>((props, ref) => {
  const {
    label,

    secureTextEntry,
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
          <InputDefault
            ref={ref}
            {...inputProps}
            label={label}
            value={value}
            onChangeText={onChange}
            error={fieldError?.message}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
    );
  }

  return <InputDefault ref={ref} label={label} secureTextEntry={secureTextEntry} {...inputProps} />;
});



export default AppInput;
