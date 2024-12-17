import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';
interface AppCheckBoxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
}

export const AppCheckBox = ({
  value,
  onChange,
  title,

}: AppCheckBoxProps) => {
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={styles(themeColors).container}
    >
      <View style={[styles(themeColors).check, value && styles(themeColors).checked]} />
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width12,
    },
    check: {
      width: Spacing.width12,
      height: Spacing.width12,
      backgroundColor: themeColors.whiteColor,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: Spacing.width12,
    },
    checked: {
      backgroundColor: themeColors.primary,
      borderWidth: 1,
      borderColor: themeColors.primary,
      borderRadius: Spacing.width12,
    },
    title: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.text,
    },
  });
