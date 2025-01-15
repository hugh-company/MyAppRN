import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface ButtonSearchProps {
  // ...existing code...
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>
}

export function ButtonSearch(props: ButtonSearchProps) {
  const { style, label } = props;
  // ...existing code...
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <LinearGradient
        colors={['#D11030', '#C1088C']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <AppText style={styles.txt}>{label}</AppText>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...existing code...
    height: Spacing.height48,
    borderRadius: Spacing.width24,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  txt: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
});
