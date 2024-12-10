import { EyeIcon, EyeOffIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
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
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const InputDefault = forwardRef<TextInput, InputDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    secureTextEntry,
    ...inputProps
  } = props;

  const [isPrivateText, setSecureTextEntry] = useState(secureTextEntry);
  const { themeColors } = useTheme();
  const getStyle = styles(themeColors);
  const togglePasswordVisibility = () => {
    setSecureTextEntry(!isPrivateText);
  };

  return (
    <View style={[getStyle.container, containerStyle]}>
      {label && <AppText style={[getStyle.label, labelStyle]}>{label}</AppText>}
      <View style={getStyle.inputContainer}>
        <TextInput
          ref={ref}
          style={[
            getStyle.input,
            isPrivateText && { paddingRight: Spacing.width45 },
            inputStyle,
            error ? getStyle.inputError : null,
          ]}
          placeholderTextColor="#999"
          secureTextEntry={isPrivateText}
          {...inputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={getStyle.iconContainer}
            onPress={togglePasswordVisibility}
          >
            {isPrivateText ? <EyeIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[getStyle.error, errorStyle]}>{error}</Text>}
    </View>
  );
});

const styles = (themeColors: ThemeColors) => StyleSheet.create({

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
    borderColor: themeColors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.width12,
    fontSize: FontSize.FontSize16,
    color: themeColors.text,
    backgroundColor: themeColors.background,
  },
  inputError: {
    borderColor: themeColors.error,
  },
  error: {
    color: themeColors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height4,
  },
  iconContainer: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',

  },
})


export default InputDefault;


