import { AppCheckBox, AppText } from '@components';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import { PriorityTaskKey } from '@types';
import { priorityTask } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
interface PriorityPickerProps {
  value: PriorityTaskKey;
  onChange: (value: PriorityTaskKey) => void;
  error?: string;
}

export const PriorityPicker = ({ value, onChange, error }: PriorityPickerProps) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{t('form.priority')}</AppText>
      <View style={styles.listStatus} >
        {priorityTask.map((item, index) => (
          <AppCheckBox
            value={value === item.key}
            onChange={() => {
              onChange(item.key);
            }}
            title={item.title}
            key={index}
          />
        ))}
      </View>
      <AppText style={styles.error}>{error}</AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {

  },

  listStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStatus: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.text,
  },
  title: {
    ...FontWithFamily.FontWithFamily_600,
    marginBottom: Spacing.width12,
  },
  error: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.red,
  },
});
