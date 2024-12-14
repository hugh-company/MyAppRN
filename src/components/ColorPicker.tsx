import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import { TaskColor } from '@types';
import { colorBackgroundTask } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from './AppText';

interface ColorPickerProps {
  value: TaskColor;
  onChange: (color: TaskColor) => void;
  error?: string;
  label?: string;
}


export const ColorPicker = ({ value, onChange, error, label }: ColorPickerProps) => {
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View style={styles.listColor}>
        {colorBackgroundTask.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onChange(color)}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              value === color && styles.selected,
            ]}
          />
        ))}
      </View>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.height16,
  },
  listColor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  label: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
    marginBottom: Spacing.height8,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height4,
  },
  colorBox: {
    width: Spacing.width40,
    height: Spacing.width40,
    borderRadius: Spacing.width8,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 0.65,

    elevation: 1,
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.black,
  },
});
