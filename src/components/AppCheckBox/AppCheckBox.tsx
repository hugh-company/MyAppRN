import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';
interface AppCheckBoxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
}

export const AppCheckBox = ({ value, onChange, title }: AppCheckBoxProps) => {
  return (
    <TouchableOpacity onPress={() => onChange(!value)} style={styles.container}>
      <View style={[styles.check, value && styles.checked]} />
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.width12,
  },
  check: {
    width: Spacing.width12,
    height: Spacing.width12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.width12,
  },
  checked: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Spacing.width12,
  },
  title: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.text,
  },
});
