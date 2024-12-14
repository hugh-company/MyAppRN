import { EyeIcon, EyeOffIcon } from '@assets';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';

interface InputDefaultProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;

  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const InputDefault = forwardRef<TextInput, InputDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    style,
    labelStyle,
    errorStyle,
    secureTextEntry,
    ...inputProps
  } = props;

  const [isPrivateText, setSecureTextEntry] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!isPrivateText);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isPrivateText && { paddingRight: Spacing.width45 },
            style,
            error ? styles.inputError : null,
          ]}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={isPrivateText}
          {...inputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            {isPrivateText ? <EyeIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        )}
      </View>
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
    </View>
  );
});

const styles = StyleSheet.create({

  container: {
    marginBottom: Spacing.height16,
  },
  label: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,

    marginBottom: Spacing.height8,
  },
  inputContainer: {
    position: 'relative',

  },
  input: {
    height: Spacing.height48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.width12,
    fontSize: FontSize.FontSize14,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height4,
  },
  iconContainer: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',

  },
});


export default InputDefault;


