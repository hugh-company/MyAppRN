import { CalenderIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { formatDate } from '@utils';
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
import DatePicker from 'react-native-date-picker';
import { AppText } from '../AppText';

interface InputDefaultProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const InputDateDefault = forwardRef<TextInput, InputDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    style,
    labelStyle,
    errorStyle,

    ...inputProps
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const [open, setOpen] = useState(false);
  const openDatePicker = () => {
    setOpen(true);
  };
  return (
    <>

      <View style={[styles.container, containerStyle]}>
        {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
        <TouchableOpacity onPress={openDatePicker} style={styles.inputContainer}>
          <AppText style={[
            styles.input,

            style,
            error ? styles.inputError : null,
            isFocus && styles.inputFocus,
            !props.value && { color: themeColors.placeholder },
          ]}>
            {props.value ? formatDate(props.value, 'DD/MM/YYYY') : props.placeholder}
          </AppText>

          <View
            style={styles.iconContainer}

          >
            <CalenderIcon />
          </View>

        </TouchableOpacity>
        {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
      </View>
      <DatePicker
        open={open}
        maximumDate={new Date()}
        mode="date"
        modal
        date={props.value ? new Date(props.value) : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          props.onChangeText?.(date.toString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
});

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,
    },
    label: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,

      marginBottom: Spacing.height8,
    },
    inputContainer: {


      height: Spacing.height48,
      backgroundColor: themeColors.inputBackground,
      paddingHorizontal: Spacing.width12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: 8,
      gap: Spacing.width16,
    },
    input: {

      paddingRight: Spacing.width45,

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
      height: '100%',
      justifyContent: 'center',

    },
  });


export default InputDateDefault;


