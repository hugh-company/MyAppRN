import { AppText } from '@components';
import { ColorsApp, FontWithFamily, Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
export interface GigabytePostProps {
  maxGigabyte: number;
  currentGigabyte: number;
  style?: StyleProp<ViewStyle>
}

export function GigabytePost(props: GigabytePostProps) {
  const {
    maxGigabyte,
    currentGigabyte, style,
  } = props;
  const percent = (currentGigabyte / maxGigabyte) * 100;

  return (
    <View style={[styles.container, style]}>
      <AppText>{t('gigbyte')}</AppText>
      <View style={styles.progress}>
        <View style={[styles.lineActive, { width: percent }]} />
      </View>
      <AppText style={styles.txtCurrent}>{currentGigabyte}/{maxGigabyte}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.width8,
    gap: Spacing.width20,
  },
  txt: {
    ...FontWithFamily.FontWithFamily_600,
    color: ColorsApp.onSurface,
  },
  progress: {
    width: '100%',
    flex: 1,
    height: Spacing.width6,
    backgroundColor: ColorsApp.placeholder,
    borderRadius: Spacing.width3,
    overflow: 'hidden',
  },
  lineActive: {
    height: Spacing.width6,
    backgroundColor: ColorsApp.primary,
    borderRadius: Spacing.width3,
  },
  txtCurrent: {
    ...FontWithFamily.FontWithFamily_500,
    color: ColorsApp.placeholder,
  },
});
