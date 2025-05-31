import { FontSize, Spacing, ThemeColors } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DomainDetailProps {
  detail: any;
  themeColors: ThemeColors;
}

const DomainDetail: React.FC<DomainDetailProps> = ({ detail, themeColors }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.primary }]}>Domain Detail</Text>
      <Text style={[styles.detailText, { color: themeColors.text }]}>{JSON.stringify(detail, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.width16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: Spacing.width16,
  },
  title: {
    fontSize: FontSize.FontSize18,
    marginBottom: Spacing.width8,
  },
  detailText: {
    fontSize: FontSize.FontSize14,
  },
});

export default DomainDetail;
