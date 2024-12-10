import React, { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native';
import InputDefault from './InputDefault';

interface AppInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
  control?: Control<T>;
  name?: Path<T>;
}

const AppInput = forwardRef<TextInput, AppInputProps<any>>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  error: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
});

export default AppInput;
