import React, { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import InputSocialDefault from './AppInputSocialDefault';

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

const AppInputSocial = forwardRef<TextInput, AppInputProps<any>>((props, ref) => {
  const {
    label,
    secureTextEntry,
    control,
    name,
    ...inputProps
  } = props;

  const validateInput = (text: string) => {
    const regex = /^[a-zA-ZÀ-ỹ\s]*$/u; // Allow Vietnamese and English characters
    return regex.test(text);
  };

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
          <InputSocialDefault
            ref={ref}
            {...inputProps}
            label={label}
            value={value}
            onChangeText={(text) => {
              if (name === 'fullname' && validateInput(text)) {
                onChange(text);
              } else if (name !== 'fullname') {
                onChange(text);
              }
            }}
            error={fieldError?.message}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
    );
  }

  return (
    <InputSocialDefault
      ref={ref}
      label={label}
      secureTextEntry={secureTextEntry}
      {...inputProps}
      onChangeText={(text) => {
        if (name === 'name' && validateInput(text)) {
          inputProps.onChangeText?.(text);
        } else if (name !== 'name') {
          inputProps.onChangeText?.(text);
        }
      }}
    />
  );
});

export default AppInputSocial;
