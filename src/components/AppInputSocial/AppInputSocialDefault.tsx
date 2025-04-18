import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { forwardRef, useMemo, useState } from 'react';
import {
  Clipboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
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
  baseUrl: string;
  secureTextEntry?: boolean;
}

const InputSocialDefault = forwardRef<TextInput, InputDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    style,
    labelStyle,
    errorStyle,
    baseUrl,
    ...inputProps
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  const handlePaste = async () => {
    const text = await Clipboard.getString();
    if (text && inputProps.onChangeText) {
      inputProps.onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <View style={styles.inputContainer}>
        <View style={styles.viewBaseUrl}>
          <AppText style={styles.txtBaseUrl}>
            {baseUrl}
          </AppText>
        </View>
        <TextInput
          ref={ref}
          // onPressIn={() => {
          //   setIsFocus(true);
          // }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          style={[
            styles.input,
            style,
            error ? styles.inputError : null,
            isFocus && styles.inputFocus,
          ]}
          placeholderTextColor={themeColors.placeholder}

          {...inputProps}
        />

        {/* <TouchableOpacity
          style={styles.iconContainer}
          onPress={handlePaste}
        >
          <IconPaste />
        </TouchableOpacity> */}

      </View>
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
    </View>
  );
});

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,
      minHeight: Spacing.height48,
    },
    label: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,

      marginBottom: Spacing.height8,
    },
    inputContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      backgroundColor: themeColors.inputBackground,
      overflow: 'hidden',
    },
    input: {
      height: Spacing.height48,

      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize14,
      color: themeColors.inputText,
      flex: 1,
    },
    inputError: {
      borderColor: themeColors.error,
    },
    inputFocus: {
      borderColor: themeColors.primary,
    },
    error: {
      color: themeColors.error,
      fontSize: FontSize.FontSize12,
      marginTop: Spacing.height4,
    },
    iconContainer: {
      justifyContent: 'center',
    },
    viewBaseUrl: {
      backgroundColor: 'black',
      borderRightWidth: 1,
      borderRightColor: themeColors.inputBorder,
      width: Spacing.width120,
      height: Spacing.height48,
      justifyContent: 'center',
      paddingHorizontal: Spacing.width8,
    },
    txtBaseUrl: {
      ...FontWithFamily.FontWithFamily_400,
      fontSize: FontSize.FontSize9,
      color: themeColors.inputText,
    },
  });


export default InputSocialDefault;


