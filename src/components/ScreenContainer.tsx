import { Spacing } from '@theme';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: any;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Spacing.height70 + (Platform.OS === 'ios' ? 16 : 0), // thêm khoảng cách cho tab bar và safe area
  },
});

export default ScreenContainer;
