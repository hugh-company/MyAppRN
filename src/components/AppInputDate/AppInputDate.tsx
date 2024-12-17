import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { formatDate } from '@utils';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { AppText } from '../AppText';

interface AppInputDateProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
  label?: string;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  placeholder?: string;
}
export const AppInputDate = ({ value, onChange, error, label, labelStyle, inputStyle, errorStyle, placeholder }: AppInputDateProps) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <View style={styles.container}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <TouchableOpacity
        style={[styles.input, inputStyle]}
        onPress={() => setOpenDatePicker(true)}
      >

        <AppText style={[value ? styles.txtValue : styles.placeholder]}>
          {value ? formatDate(new Date(value), 'DD/MM/YYYY') : placeholder}
        </AppText>

      </TouchableOpacity>
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}

      <DatePicker
        modal
        open={openDatePicker}
        date={new Date(value)}

        onConfirm={(date) => {
          setOpenDatePicker(false);
          onChange(date.toISOString());
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
        minimumDate={new Date()}
      />
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.height16,
    },
    input: {
      borderWidth: 1,
      borderColor: themeColors.inputBorder,
      borderRadius: Spacing.width8,
      height: Spacing.height44,
      justifyContent: 'center',
      paddingHorizontal: Spacing.width12,
    },
    label: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
      marginBottom: Spacing.height8,
    },
    error: {
      color: themeColors.error,
      fontSize: FontSize.FontSize12,
      marginTop: Spacing.height4,
    },
    txtValue: {
      color: themeColors.inputText,
    },
    placeholder: {
      color: themeColors.placeholder,
    },
  });
